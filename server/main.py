from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from game_logic import check_board_state
from models import BoardRequest

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

    result = check_board_state(board_request.board, board_request.dimension)

    return result




