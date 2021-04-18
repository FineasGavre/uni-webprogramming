package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Validation;

import org.springframework.stereotype.Component;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.User;

@Component
public class UserValidator implements BaseValidator<User> {

    @Override
    public boolean validate(User entity) {
        return true;
    }

}
