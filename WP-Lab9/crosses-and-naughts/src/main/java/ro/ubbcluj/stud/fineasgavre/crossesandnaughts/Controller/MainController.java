package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping(value = "/")
    public String redirectToGames() {
        return "redirect:/games/";
    }

}
