from unittest.mock import MagicMock, patch
import pytest
from server.ai_agent import AIAgent
from server.game_logic import TicTacToeGame

#the patch is to overwrites the pointer genai.Client value to point to the mock version
@patch("server.ai_agent.genai.Client")
#mock_client_class is a dynamically generated Python parameter created automatically by the @patch decorator, 
# and its value is the fake "blueprint" (the class) replacing genai.Client.
def test_play_turn_with_successful_ai_move(mock_client_class):
    """Tests that a clean numerical string from Gemini is cleanly parsed"""

    board = [
        "X", "O", "X",
        "",  "O", "",
        "",  "",  "O"
    ]
    dimension = 3 

    # Setup fake API response
    mock_response = MagicMock()
    mock_response.text = "7" #Forcing our fake API to choose index 7

    # 2. Mock a client to return our fake response
    mock_client_instance = mock_client_class.return_value
    mock_client_instance.models.generate_content.return_value = mock_response
    
    # 3. Instantiate objects
    ai_agent = AIAgent(model_name="gemini-2.5-flash", max_retries=3)
    game = TicTacToeGame(board, dimension)

    # Act
    result = ai_agent.play_turn(board, dimension, game)

    # Assert
    assert isinstance(result, int)  # Clean type-check fix
    assert result == 7              
    
    # Verify that code actually attempted to call the API exactly once
    mock_client_instance.models.generate_content.assert_called_once()


@patch("server.ai_agent.genai.Client")
def test_play_turn_fallback_on_invalid_ai_response(mock_client_class):
    board = [
        "X", "O", "X",
        "",  "O", "",
        "",  "",  "O"
    ]
    dimension = 3

    mock_response = MagicMock()
    mock_response.text = "I think I want to play in the middle row!"

    mock_client_instance = mock_client_class.return_value
    mock_client_instance.models.generate_content.return_value = mock_response

    ai_agent = AIAgent(model_name="gemini-2.5-flash", max_retries=1) # Set retries to 1 for quick testing
    game = TicTacToeGame(board, dimension)

    # Act
    result = ai_agent.play_turn(board, dimension, game)

    # Assert
    # The first available open square on our board is index 3. 
    # Because the AI returned gibberish, our _get_emergency_fallback_move should take over!
    assert result == 3