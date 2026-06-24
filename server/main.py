from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from game_logic import TicTacToeGame
from models import BoardRequest
from ai_agent import AIAgent
# from ai_agent import get_AI_move

# Initialize the FastAPI application
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials = False,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.post("/api/move")
def handle_move( board_request:BoardRequest):

    game = TicTacToeGame(board_request.board, board_request.dimension )

    ai_player = AIAgent()
    game_result = game.execute_player_turn()

    if game_result.game_result.result:
        return game_result
    else:
        #call the AI player
        result = game.execute_ai_turn(ai_player) 
        return result

