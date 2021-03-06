package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.User;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Validation.UserValidator;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public boolean createUser(User user) {
        var validated = userValidator.validate(user);

        if (!validated) {
            return false;
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }
}
