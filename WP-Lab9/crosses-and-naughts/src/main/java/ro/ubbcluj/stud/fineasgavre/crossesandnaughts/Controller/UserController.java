package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.User;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Service.UserService;

import java.awt.*;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/create")
    public String displayCreateUser() {
        return "users/create";
    }

    @PostMapping(value = "/create")
    public void createUser(@RequestParam String username, @RequestParam String password) {
        var user = new User(username, password);
        userService.createUser(user);
    }

}
