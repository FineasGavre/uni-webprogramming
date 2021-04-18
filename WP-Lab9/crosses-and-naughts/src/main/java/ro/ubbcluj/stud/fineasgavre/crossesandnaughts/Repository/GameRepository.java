package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Repository;

import org.springframework.data.repository.CrudRepository;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Game;

public interface GameRepository extends CrudRepository<Game, Long> {

    Iterable<Game> findAllByOrderByGameStatusDesc();

}
