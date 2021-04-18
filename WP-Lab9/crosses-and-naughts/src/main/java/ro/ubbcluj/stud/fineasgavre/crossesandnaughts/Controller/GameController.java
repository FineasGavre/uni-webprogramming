package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Game;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.GameLogic.GameBoard;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Repository.UserRepository;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Service.GameService;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Service.UserService;

import java.security.Principal;

@Controller
@RequestMapping(value = "/games")
public class GameController {

    @Autowired
    private UserService userService;

    @Autowired
    private GameService gameService;

    @GetMapping(value = "/")
    public String displayAllGames(Model model, Principal principal) {
        model.addAttribute("user", userService.getUserByUsername(principal.getName()));
        model.addAttribute("games", gameService.getAllGames());

        return "games/display";
    }

    @PostMapping(value = "/create")
    public String createGame(Principal principal) {
        var user = userService.getUserByUsername(principal.getName());
        var game = gameService.createGameForUser(user);

        return "redirect:/games/" + game.getId().toString();
    }

    @GetMapping(value = "/{id}")
    public String displayGame(Principal principal, @PathVariable Long id, Model model) {
        var game = gameService.getGameById(id);
        var user = userService.getUserByUsername(principal.getName());

        if (game.getPlayerTurn() == Game.PlayerTurn.OWNER && game.getOwnerUser().getId().equals(user.getId())) {
            model.addAttribute("turnToMove", true);
        } else if (game.getPlayerTurn() == Game.PlayerTurn.JOINER && game.getJoinerUser().getId().equals(user.getId())) {
            model.addAttribute("turnToMove", true);
        } else {
            model.addAttribute("turnToMove", false);
        }

        model.addAttribute("user", user);
        model.addAttribute("game", game);
        model.addAttribute("board", new GameBoard(game.getGameboard()));


        return "games/displayOne";
    }

    @PostMapping(value = "/{id}/join")
    public String joinGame(Principal principal, @PathVariable Long id) {
        var user = userService.getUserByUsername(principal.getName());
        gameService.joinGame(id, user);

        return "redirect:/games/" + id;
    }

    @PostMapping(value = "/{id}/move")
    public String makeMove(Principal principal, @PathVariable Long id, @RequestParam Integer position) {
        var user = userService.getUserByUsername(principal.getName());
        gameService.makeMove(id, user, position);

        return "redirect:/games/" + id;
    }
}
