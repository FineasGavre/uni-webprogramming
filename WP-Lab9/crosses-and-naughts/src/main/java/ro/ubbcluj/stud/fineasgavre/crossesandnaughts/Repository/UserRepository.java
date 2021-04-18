package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Repository;

import org.springframework.data.repository.CrudRepository;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.User;

public interface UserRepository extends CrudRepository<User, Long> {

    User getUserByUsername(String username);

}
