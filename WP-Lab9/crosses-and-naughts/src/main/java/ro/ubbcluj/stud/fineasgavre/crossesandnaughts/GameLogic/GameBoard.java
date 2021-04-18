package ro.ubbcluj.stud.fineasgavre.crossesandnaughts.GameLogic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GameBoard {

    public enum BoardState {
        EMPTY, CROSS, NAUGHT
    }

    // 0 1 2
    // 3 4 5
    // 6 7 8

    public static final String EMPTY_BOARD = "NNNNNNNNN";

    private ArrayList<BoardState> board;
    private ArrayList<List<Integer>> winPosition;

    public GameBoard(String boardInput) {
        this.board = parseBoardString(boardInput);

        winPosition = new ArrayList<>();
        winPosition.add(Arrays.asList(0, 1, 2));
        winPosition.add(Arrays.asList(0, 3, 6));
        winPosition.add(Arrays.asList(6, 7, 8));
        winPosition.add(Arrays.asList(2, 5, 8));
        winPosition.add(Arrays.asList(0, 4, 8));
        winPosition.add(Arrays.asList(2, 4, 6));
    }

    public String getBoard() {
        return getBoardString(board);
    }

    public BoardState hasWon() {
        if (checkIfHasWon(BoardState.CROSS)) {
            return BoardState.CROSS;
        } else if (checkIfHasWon(BoardState.NAUGHT)) {
            return BoardState.NAUGHT;
        }

        return BoardState.EMPTY;
    }

    public void putMove(BoardState state, int position) {
        if (board.get(position) == BoardState.EMPTY) {
            board.set(position, state);
        }
    }

    public ArrayList<Integer> getEmptyPositions() {
        var arrayList = new ArrayList<Integer>();

        for (int i = 0; i < board.size(); i++) {
            if (board.get(i) == BoardState.EMPTY) {
                arrayList.add(i);
            }
        }

        return arrayList;
    }

    public ArrayList<BoardState> getBoardList() {
        return board;
    }

    private boolean checkIfHasWon(BoardState state) {
        for (var positions : winPosition) {
            if (board.get(positions.get(0)) == state && board.get(positions.get(1)) == state && board.get(positions.get(2)) == state) {
                return true;
            }
        }

        return false;
    }

    public boolean hasRanOutOfSpaces() {
        for (BoardState boardState : board) {
            if (boardState != BoardState.EMPTY) {
                return false;
            }
        }

        return true;
    }

    private static ArrayList<BoardState> parseBoardString(String boardString) {
        var arrayList = new ArrayList<BoardState>();

        for (int i = 0; i < boardString.length(); i++) {
            if (boardString.charAt(i) == 'X') {
                arrayList.add(i, BoardState.CROSS);
            } else if (boardString.charAt(i) == 'O') {
                arrayList.add(i, BoardState.NAUGHT);
            } else {
                arrayList.add(i, BoardState.EMPTY);
            }
        }

        return arrayList;
    }

    private static String getBoardString(ArrayList<BoardState> board) {
        var boardString = new StringBuilder();

        for (var boardState : board) {
            if (boardState == BoardState.EMPTY) {
                boardString.append("N");
            } else if (boardState == BoardState.CROSS) {
                boardString.append("X");
            } else if (boardState == BoardState.NAUGHT) {
                boardString.append("O");
            }
        }

        return boardString.toString();
    }

}
