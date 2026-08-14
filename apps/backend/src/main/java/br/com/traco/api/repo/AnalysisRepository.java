package br.com.traco.api.repo;

import br.com.traco.api.model.Analysis;
import br.com.traco.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {

    List<Analysis> findByOrderByIdDesc();

    List<Analysis> findByProjectUserOrderByIdDesc(User user);

    Optional<Analysis> findFirstByOrderByIdDesc();

    Optional<Analysis> findFirstByPlantaId(Long plantaId);

    @Query("select a.code from Analysis a")
    List<String> allCodes();
}