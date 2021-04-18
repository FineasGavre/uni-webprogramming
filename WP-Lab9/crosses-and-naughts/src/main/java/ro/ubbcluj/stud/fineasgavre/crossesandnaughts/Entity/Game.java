package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity;

import ro.ubbcluj.stud.fineasgavre.crossesandnaughts.GameLogic.GameBoard;

import javax.persistence.*;

@Entity
@Table(name = "games")
public class Game {

    public enum GameStatus {
        WAITING, INGAME, FINISHED
    }

    public enum PlayerTurn {
        OWNER, JOINER
    }

    public enum Winner {
        OWNER, JOINER, DRAW
    }

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User ownerUser;

    @ManyToOne
    @JoinColumn(name = "joiner_id")
    private User joinerUser;

    @Enumerated(EnumType.STRING)
    private GameStatus gameStatus = GameStatus.WAITING;

    private String gameboard = GameBoard.EMPTY_BOARD;

    @Enumerated(EnumType.STRING)
    private PlayerTurn playerTurn = PlayerTurn.OWNER;

    @Enumerated(EnumType.STRING)
    private Winner winner;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public User getOwnerUser() {
        return ownerUser;
    }

    public void setOwnerUser(User ownerUser) {
        this.ownerUser = ownerUser;
    }

    public User getJoinerUser() {
        return joinerUser;
    }

    public void setJoinerUser(User joinerUser) {
        this.joinerUser = joinerUser;
    }

    public GameStatus getGameStatus() {
        return gameStatus;
    }

    public void setGameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
    }

    public String getGameboard() {
        return gameboard;
    }

    public void setGameboard(String gameboard) {
        this.gameboard = gameboard;
    }

    public PlayerTurn getPlayerTurn() {
        return playerTurn;
    }

    public void setPlayerTurn(PlayerTurn playerTurn) {
        this.playerTurn = playerTurn;
    }

    public Winner getWinner() {
        return winner;
    }

    public void setWinner(Winner winner) {
        this.winner = winner;
    }
}
