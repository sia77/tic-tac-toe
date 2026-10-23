from app.game_logic import TicTacToeGame
from app.models import GameStateResponse, Status, BoardState

def test_horizontal_winner():
    board = [
        "X", "X", "X",
        "",  "O", "",
        "",  "",  "O"
    ]

    game = TicTacToeGame(board, dimension=3)

    #act
    state = game.check_board_state()

    #assert
    assert state.status == Status.WIN
    assert state.winner == "X"
    assert state.winning_line =="row_0"


def test_main_diagonal_winner():
    board = [
        "O", "X", "X",
        "",  "O", "",
        "",  "",  "O"
    ]

    game = TicTacToeGame(board, dimension=3)

    #act
    state = game.check_board_state()

    #asset
    assert state.status == Status.WIN
    assert state.winner == "O"
    assert state.winning_line == "main_diagonal"

def test_no_winner():
    board = [
        "O", "X", "X",
        "",  "", "",
        "",  "",  "O"
    ]

    game = TicTacToeGame(board, dimension=3)

    #act
    state = game.check_board_state()

    #asset
    assert state.status == Status.IN_PROGRESS
    assert state.winner is None