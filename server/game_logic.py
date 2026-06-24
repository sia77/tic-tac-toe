from fastapi import HTTPException, status

from models import BoardStateResponse, GameStatus
from ai_agent import AIAgent

class TicTacToeGame:
    def __init__(self, board:list[str], dimension:int ):

        if board is None :
            self.board = [""] * (dimension ** 2)
        else:
            self.board = board
        self.dimension = dimension


    def _allTheSame(self,lst):
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


    def check_board_state(self)-> BoardStateResponse:

        limit = len(self.board)//self.dimension
        diagonal_list = []
        anti_diagonal_list = []

        # Diagonals
        for r in range (0, limit):
            row_list = []
            col_list = []
    
            row_list = self.get_row_list(r) #Horizontal
            col_list= self.get_col_list(r)   #Vertical 

            if self._allTheSame(row_list):
                return BoardStateResponse(result=True, config=f"row_{r}", winner=row_list[0])
            if self._allTheSame(col_list):
                return BoardStateResponse(result=True, config=f"column_{r}", winner=col_list[0])

        diagonal_list = self.get_diagonal_list()
        anti_diagonal_list = self.get_anti_diagonal_list()

        if self._allTheSame(diagonal_list):
            return BoardStateResponse(result=True, config="main_diagonal", winner=diagonal_list[0])
        if self._allTheSame(anti_diagonal_list):
            return BoardStateResponse(result=True, config="anti_diagonal", winner=anti_diagonal_list[0])
        
        return BoardStateResponse(result=False, config=None, winner=None)  
    

    def execute_ai_turn(self, ai_player:AIAgent) -> GameStatus:
        """This manages AI turns, and updates the board status accordingly, and"""

        ai_move = ai_player.play_turn(self.board, self.dimension, self )

        self.board[ai_move] = "O"

        result = self.check_board_state()

        return GameStatus(
            game_result=result, 
            board_status=self.board
        )
    
    def execute_player_turn(self) -> GameStatus:
        result = self.check_board_state()

        return GameStatus(
            game_result=result, 
            board_status=self.board
        )




