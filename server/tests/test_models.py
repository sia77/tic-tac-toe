import pytest
from pydantic import ValidationError
from app.models import BoardRequest

def test_board_request_valid_and_upercase():
    # arrange and act
    payload = BoardRequest(dimension=3, board=["x", "o", "o", "", "", "", "o", "x", ""])

    # Assert
    assert payload.board[0] == "X"  #Verifies uppercase mutation worked
    assert payload.board[1] == "O"

def test_board_request_invald_dimension_too_large():
    with pytest.raises(ValidationError):
        BoardRequest(dimension=6, board=[""] * 36)

def test_board_request_invalid_length():
    # A 3x3 board needs 9 elements. Providing 8 should fails.
    with pytest.raises(ValidationError):
        BoardRequest(dimension=3, board=[""] * 8)
    
