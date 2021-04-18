package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Game;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.User;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.GameLogic.GameBoard;
import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Repository.GameRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public Iterable<Game> getAllGames() {
        return gameRepository.findAllByOrderByGameStatusDesc();
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).get();
    }

    public Game createGameForUser(User user) {
        var game = new Game();
        game.setOwnerUser(user);

        gameRepository.save(game);
        return game;
    }

    @Transactional
    public void joinGame(Long gameId, User user) {
        var gameOpt = gameRepository.findById(gameId);
        if (gameOpt.isEmpty()) {
            return;
        }

        var game = gameOpt.get();

        if (!game.getOwnerUser().getId().equals(user.getId()) && game.getJoinerUser() == null) {
            game.setJoinerUser(user);
            game.setGameStatus(Game.GameStatus.INGAME);

            gameRepository.save(game);
        }
    }

    @Transactional
    public void makeMove(Long gameId, User user, int position) {
        var game = gameRepository.findById(gameId).get();

        if (game.getGameStatus() != Game.GameStatus.INGAME) {
            return;
        }

        var userState = GameBoard.BoardState.EMPTY;

        if (game.getPlayerTurn() == Game.PlayerTurn.OWNER) {
            if (!user.getId().equals(game.getOwnerUser().getId())) {
                return;
            }

            userState = GameBoard.BoardState.CROSS;
        } else if (game.getPlayerTurn() == Game.PlayerTurn.JOINER) {
            if (!user.getId().equals(game.getJoinerUser().getId())) {
                return;
            }

            userState = GameBoard.BoardState.NAUGHT;
        }

        var gameboard = new GameBoard(game.getGameboard());
        gameboard.putMove(userState, position);

        if (game.getPlayerTurn() == Game.PlayerTurn.OWNER) {
            game.setPlayerTurn(Game.PlayerTurn.JOINER);
        } else if (game.getPlayerTurn() == Game.PlayerTurn.JOINER) {
            game.setPlayerTurn(Game.PlayerTurn.OWNER);
        }

        if (gameboard.hasWon() == GameBoard.BoardState.CROSS) {
            game.setWinner(Game.Winner.OWNER);
            game.setGameStatus(Game.GameStatus.FINISHED);
        } else if (gameboard.hasWon() == GameBoard.BoardState.NAUGHT) {
            game.setWinner(Game.Winner.JOINER);
            game.setGameStatus(Game.GameStatus.FINISHED);
        } else if (gameboard.hasRanOutOfSpaces()) {
            game.setWinner(Game.Winner.DRAW);
            game.setGameStatus(Game.GameStatus.FINISHED);
        }

        game.setGameboard(gameboard.getBoard());
        gameRepository.save(game);
    }
}
