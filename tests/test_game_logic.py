from server.game_logic import TicTacToeGame

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
    assert state.result is True
    assert state.winner == "X"
    assert state.config =="row_0"


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
    assert state.result is True
    assert state.winner == "O"
    assert state.config == "main_diagonal"

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
    assert state.result is False
    assert state.winner is None