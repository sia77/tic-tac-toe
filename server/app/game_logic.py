from fastapi import HTTPException, status

from app.models import GameStateResponse, Status, BoardState
from app.ai_agent import AIAgent

class TicTacToeGame:
    def __init__(self, board:list[str], dimension:int ):

        if board is None :
            self.board = [""] * (dimension ** 2)
        else:
            self.board = board
        self.dimension = dimension


    def _all_the_same(self,lst):
        if lst[0] in (" ", ""):
            return False
                
        for i in range(1,len(lst)):
            if lst[0] != lst[i]:
                return False

        return True
    
    def get_row_data(self, row_index:int)->dict[str, list]:
        """Returns the corresponding cells and indices for a row."""
        start = row_index*self.dimension
        end = start + self.dimension
        return {
            "cells": self.board[start:end],
            "indices": list(range(start, end))
        }

    def get_col_data(self, col_index:int)->dict[str, list]:
        """Returns the corresponding column/list for an index"""
        return {
            "cells":self.board[col_index::self.dimension],
            "indices":list(range(col_index, len(self.board), self.dimension))
        }    
            
    def get_diagonal_data(self)->dict[str, list]:
        """Creates a list of all the diagonal items in the board"""
        return {
            "cells":self.board[0::(self.dimension+1)],
            "indices":list(range(0, len(self.board), self.dimension+1))
        }
    
    def get_anti_diagonal_data(self,)->dict[str, list]:
        """Creates a list of all the anti-diagonal itmes in the board"""
        return {
            "cells":self.board[self.dimension-1::self.dimension-1][:self.dimension],
            "indices":list(range(self.dimension-1, len(self.board), self.dimension-1)[:self.dimension])
        }
        

    def _is_line_deadlocked(self, cells:list[str])->bool:
        has_x = "X" in cells
        has_o = "O" in cells
        return has_x and has_o

    def _all_lines(self):
        for i in range(self.dimension):
            yield f"row_{i}", self.get_row_data(i)
            yield f"column_{i}", self.get_col_data(i)
        yield "main_diagonal", self.get_diagonal_data()
        yield "anti_diagnal", self.get_anti_diagonal_data()


    def check_board_state(self)-> BoardState:
        all_deadlocked = True

        for line_id, cell_data in self._all_lines():
            if self._all_the_same(cell_data["cells"]):
                return BoardState(
                    status=Status.WIN, 
                    winning_line=line_id, 
                    winner=cell_data["cells"][0],
                    winning_indices=cell_data["indices"]
                )
            #print(f"cells: {cell_data}")
            if not self._is_line_deadlocked(cell_data["cells"]):
                all_deadlocked= False
                #print(f"all_deadlocked: {all_deadlocked}")

        if all_deadlocked:
            return BoardState(
                status=Status.DRAW, 
                winning_line=None, 
                winner=None,
                winning_indices=[] 
            )

        return BoardState(
            status=Status.IN_PROGRESS, 
            winning_line=None, 
            winner=None,
            winning_indices=[]
        )
    

    def execute_ai_turn(self, ai_player:AIAgent) -> GameStateResponse:
        """This manages AI turns, and updates the board status accordingly, and"""

        ai_move = ai_player.play_turn(self.board, self.dimension, self )

        # print(f"ai_move: {ai_move}")

        self.board[ai_move] = "O"

        result = self.check_board_state()

        return GameStateResponse(
            board_state=result, 
            board_cells=self.board
        )
    
    def execute_player_turn(self) -> GameStateResponse:
        result = self.check_board_state()

        return GameStateResponse(
            board_state=result, 
            board_cells=self.board
        )


