from pydantic import BaseModel, model_validator
from typing import ClassVar

class GameStatus(BaseModel):
    game_result: BoardStateResponse
    board_status: list[str]

class BoardStateResponse(BaseModel):
    result:bool
    config:str | None
    winner:str | None

class BoardRequest(BaseModel):
    dimension:int = 3
    board:list[str] =[
        "","","",
        "","","",
        "","",""]

    # Constants
    MAX_DIMENSION: ClassVar[int] = 5
    MIN_DIMENSION:  ClassVar[int] = 3


    @model_validator(mode="after")
    def validate_board(self):
        if self.dimension > self.MAX_DIMENSION:
            raise ValueError(f"Dimension too large. The maximum allowed board dimension is {self.MAX_DIMENSION}x{self.MAX_DIMENSION}.")
        
        if self.dimension < self.MIN_DIMENSION:
            raise ValueError(f"Dimension too small. The minimum allowed board dimension is {self.MIN_DIMENSION}x{self.MIN_DIMENSION}.")
        expected_length = self.dimension ** 2
        if len(self.board) != expected_length:
            raise ValueError(
                f"Invalid board length. Expected {expected_length} items for a {self.dimension}x{self.dimension} grid, but got {len(self.board)}."
            )
        
        self.board = [ cell.upper() for cell in self.board]
        return self