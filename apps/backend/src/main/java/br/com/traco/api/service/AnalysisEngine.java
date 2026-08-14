package br.com.traco.api.service;

import br.com.traco.api.model.Analysis;
import br.com.traco.api.model.Planta;
import br.com.traco.api.repo.AnalysisRepository;
import br.com.traco.api.repo.PlantaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Pipeline simulado de IA: lê a planta (async), deriva quantitativos
 * determinísticos a partir do arquivo e publica a análise + orçamento.
 * Em produção, este bean será substituído pelo worker de visão computacional.
 */
@Service
public class AnalysisEngine {

    private final PlantaRepository plantaRepository;
    private final AnalysisRepository analysisRepository;
    private final ObjectMapper objectMapper;

    public AnalysisEngine(PlantaRepository plantaRepository,
                          AnalysisRepository analysisRepository,
                          ObjectMapper objectMapper) {
        this.plantaRepository = plantaRepository;
        this.analysisRepository = analysisRepository;
        this.objectMapper = objectMapper;
    }

    @Async
    @Transactional
    public void process(Long plantaId) {
        try {
            Thread.sleep(2500); // simula filas + inferência do modelo
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return;
        }

        Planta planta = plantaRepository.findById(plantaId).orElse(null);
        if (planta == null) return;

        String name = planta.getName() == null ? "" : planta.getName().toLowerCase();
        boolean unreadable = name.contains("fachada") || name.contains("fasade");

        Analysis analysis = new Analysis();
        analysis.setPlanta(planta);
        analysis.setProject(planta.getProject());
        analysis.setCode(nextCode());

        if (unreadable) {
            planta.setStatus("erro");
            analysis.setStatus("erro");
            analysis.setDurationSeconds(3);
            analysis.setConfidence(0);
        } else {
            long seed = Math.abs(planta.getSizeBytes() + plantaId * 7919);
            double area = round1(90 + (seed % 620) / 10.0);   // 90.0 – 151.9 m²
            int rooms = (int) (3 + (seed % 5));               // 3 – 7 ambientes
            int confidence = (int) (93 + (seed % 7));         // 93 – 99%
            int duration = (int) (8 + (seed % 18));           // 8 – 25 s

            double concrete = round2(area * 0.2276);
            double steel = round2(area * 0.0335);
            double masonry = round2(area * 1.0687);
            double forms = round2(area * 2.0028);
            double cost = round2(area * 2016.41);

            planta.setStatus("concluida");
            planta.setArea(area);
            planta.setRooms(rooms);

            analysis.setStatus("concluida");
            analysis.setDurationSeconds(duration);
            analysis.setConfidence(confidence);
            analysis.setArea(area);
            analysis.setRooms(rooms);
            analysis.setEstimatedCost(cost);
            analysis.setElementsJson(json(List.of(
                    Map.of("label", "Pilares", "value", String.valueOf(Math.round(area / 6))),
                    Map.of("label", "Vigas", "value", String.valueOf(Math.round(area / 3.9))),
                    Map.of("label", "Lajes", "value", String.valueOf(Math.round(area / 8))),
                    Map.of("label", "Paredes", "value", String.valueOf(Math.round(area / 2.5))),
                    Map.of("label", "Esquadrias", "value", String.valueOf(Math.round(area / 6.2)))
            )));
            analysis.setQuantitiesJson(json(List.of(
                    Map.of("label", "Concreto", "value", br(concrete) + " m³"),
                    Map.of("label", "Aço CA-50", "value", br(steel) + " ton"),
                    Map.of("label", "Alvenaria", "value", br(masonry) + " m²"),
                    Map.of("label", "Formas", "value", br(forms) + " m²")
            )));
        }

        plantaRepository.save(planta);
        analysisRepository.save(analysis);
    }

    private String nextCode() {
        int max = analysisRepository.allCodes().stream()
                .map(c -> c.replace("ANL-", "").trim())
                .mapToInt(s -> {
                    try {
                        return Integer.parseInt(s);
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .max()
                .orElse(0);
        return String.format("ANL-%04d", max + 1);
    }

    private String json(List<Map<String, String>> data) {
        try {
            return objectMapper.writeValueAsString(data);
        } catch (Exception e) {
            return "[]";
        }
    }

    private String br(double value) {
        return String.format(Locale.ROOT, "%.2f", value).replace('.', ',');
    }

    private double round1(double v) {
        return Math.round(v * 10.0) / 10.0;
    }

    private double round2(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}