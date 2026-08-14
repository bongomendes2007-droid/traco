package br.com.traco.api.repo;

import br.com.traco.api.model.Planta;
import br.com.traco.api.model.Project;
import br.com.traco.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantaRepository extends JpaRepository<Planta, Long> {

    List<Planta> findByOrderByIdDesc();

    List<Planta> findByProjectOrderByIdDesc(Project project);

    List<Planta> findByProjectUserOrderByIdDesc(User user);

    long countByProject(Project project);
}