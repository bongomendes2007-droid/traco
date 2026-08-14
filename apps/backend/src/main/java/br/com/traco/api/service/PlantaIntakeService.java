package br.com.traco.api.service;

import br.com.traco.api.exception.ApiException;
import br.com.traco.api.model.Planta;
import br.com.traco.api.model.Project;
import br.com.traco.api.model.User;
import br.com.traco.api.repo.PlantaRepository;
import br.com.traco.api.repo.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Locale;
import java.util.Set;

/**
 * Recebe o arquivo da planta, persiste no storage e dispara o pipeline de IA.
 * Compartilhado entre o endpoint autenticado (/api/plantas/upload)
 * e o endpoint legado (/upload/) usado pelo frontend atual.
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

        analysisEngine.process(planta.getId());
        return planta;
    }
}