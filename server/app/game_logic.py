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
    
    def get_row_list(self, row_index:int)->list[str]:
        """Returns the coresponding row/list for an index"""
        start = row_index*self.dimension
        end = start + self.dimension
        return self.board[start:end]

    def get_col_list(self, col_index:int)->list[str]:
        """Returns the corresponding column/list for an index"""
        return self.board[col_index::self.dimension]
            
    def get_diagonal_list(self)->list[str]:
        """Creates a list of all the diagonal items in the board"""
        return self.board[0::(self.dimension+1)]
    def get_anti_diagonal_list(self,)->list[str]:
        """Creates a list of all the anti-diagonal itmes in the board"""
        return self.board[self.dimension-1::self.dimension-1][:self.dimension]


    def check_board_state(self)-> BoardState:

        limit = len(self.board)//self.dimension
        diagonal_list = []
        anti_diagonal_list = []

        # Diagonals
        for r in range (0, limit):
            row_list = []
            col_list = []
    
            row_list = self.get_row_list(r) #Horizontal
            col_list= self.get_col_list(r)   #Vertical 

            if self._all_the_same(row_list):
                return BoardState( 
                    status=Status.WIN, 
                    winning_line=f"row_{r}", 
                    winner =row_list[0]
                )
            if self._all_the_same(col_list):
                return BoardState(
                    status=Status.WIN, 
                    winning_line=f"column_{r}", 
                    winner =col_list[0]
                )

        diagonal_list = self.get_diagonal_list()
        anti_diagonal_list = self.get_anti_diagonal_list()

        if self._all_the_same(diagonal_list):
            return BoardState(
                status=Status.WIN, 
                winning_line="main_diagonal", 
                winner=diagonal_list[0]
            )
        if self._all_the_same(anti_diagonal_list):
            return BoardState(
                status=Status.WIN, 
                winning_line="anti_diagonal", 
                winner=anti_diagonal_list[0]
            )

        if "" not in self.board:
            return BoardState(
                status=Status.DRAW, 
                winning_line=None, 
                winner=None 
            )

        return BoardState(
            status=Status.IN_PROGRESS, 
            winning_line=None, 
            winner=None 
        )
    

    def execute_ai_turn(self, ai_player:AIAgent) -> GameStateResponse:
        """This manages AI turns, and updates the board status accordingly, and"""

        ai_move = ai_player.play_turn(self.board, self.dimension, self )

        print(f"ai_move: {ai_move}")

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


