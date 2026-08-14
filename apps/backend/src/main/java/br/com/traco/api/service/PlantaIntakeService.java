package br.com.traco.api.service;

import br.com.traco.api.exception.ApiException;
import br.com.traco.api.model.Planta;
import br.com.traco.api.model.Project;
import br.com.traco.api.model.User;
import br.com.traco.api.repo.PlantaRepository;
import br.com.traco.api.repo.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;
import java.util.Set;

/**
 * Recebe o arquivo da planta, valida extensão + magic bytes (anti-disfarce),
 * persiste no storage e dispara o pipeline de IA após o commit.
 */
@Service
public class PlantaIntakeService {

    private static final Set<String> EXTENSIONS = Set.of("pdf", "dwg", "png", "jpg", "jpeg");

    private final PlantaRepository plantaRepository;
    private final ProjectRepository projectRepository;
    private final StorageService storageService;
    private final AnalysisEngine analysisEngine;

    public PlantaIntakeService(PlantaRepository plantaRepository,
                               ProjectRepository projectRepository,
                               StorageService storageService,
                               AnalysisEngine analysisEngine) {
        this.plantaRepository = plantaRepository;
        this.projectRepository = projectRepository;
        this.storageService = storageService;
        this.analysisEngine = analysisEngine;
    }

    @Transactional
    public Planta intake(User user, MultipartFile file, Long projectId) {
        if (file == null || file.isEmpty()) {
            throw new ApiException("Envie um arquivo de planta.");
        }
        String original = file.getOriginalFilename() == null ? "planta" : file.getOriginalFilename();
        String lower = original.toLowerCase(Locale.ROOT);
        String ext = lower.contains(".") ? lower.substring(lower.lastIndexOf('.') + 1) : "";
        if (!EXTENSIONS.contains(ext)) {
            throw new ApiException("Formato de arquivo não suportado.");
        }

        validateMagicBytes(file, ext);

        Project project;
        if (projectId != null) {
            project = projectRepository.findByIdAndUser(projectId, user)
                    .orElseThrow(() -> new ApiException("Projeto não encontrado.", 404));
        } else {
            project = projectRepository.findFirstByUserOrderByIdAsc(user)
                    .orElseGet(() -> {
                        Project p = new Project();
                        p.setName("Projeto Geral");
                        p.setUser(user);
                        p.setType("residencial");
                        p.setStatus("ativo");
                        return projectRepository.save(p);
                    });
        }

        Planta planta = new Planta();
        planta.setName(original);
        planta.setFormat("jpeg".equals(ext) ? "JPG" : ext.toUpperCase(Locale.ROOT));
        planta.setSizeBytes(file.getSize());
        planta.setStoragePath(storageService.store(file));
        planta.setProject(project);
        planta.setStatus("processando");
        planta = plantaRepository.save(planta);

        // O pipeline async só é disparado DEPOIS do commit desta transação —
        // caso contrário a thread do worker não enxergaria a planta (linha ainda
        // não commitada) e a análise morreria em silêncio.
        final Long plantaId = planta.getId();
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                analysisEngine.process(plantaId);
            }
        });
        return planta;
    }

    /**
     * Confere a assinatura binária do arquivo — impede que um .exe/.html
     * seja disfarçado com extensão de planta.
     */
    private void validateMagicBytes(MultipartFile file, String ext) {
        byte[] head;
        try (InputStream in = file.getInputStream()) {
            head = in.readNBytes(8);
        } catch (IOException e) {
            throw new ApiException("Falha ao ler o arquivo enviado.", 400);
        }
        boolean ok = switch (ext) {
            case "pdf" -> head.length >= 4
                    && head[0] == '%' && head[1] == 'P' && head[2] == 'D' && head[3] == 'F';
            case "png" -> head.length >= 4
                    && (head[0] & 0xFF) == 0x89 && head[1] == 'P' && head[2] == 'N' && head[3] == 'G';
            case "jpg", "jpeg" -> head.length >= 3
                    && (head[0] & 0xFF) == 0xFF && (head[1] & 0xFF) == 0xD8 && (head[2] & 0xFF) == 0xFF;
            case "dwg" -> head.length >= 4
                    && head[0] == 'A' && head[1] == 'C' && head[2] == '1';
            default -> true;
        };
        if (!ok) {
            throw new ApiException("O conteúdo do arquivo não corresponde à extensão informada.", 400);
        }
    }
}