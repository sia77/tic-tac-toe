from fastapi import HTTPException, status

from models import BoardStateResponse

def allTheSame(lst):

    if lst[0] in (" ", ""):
        return False
    
    for i in range(1,len(lst)):
        if lst[0] != lst[i]:
            return False

    return True

# def validate_board_dimension(board:list[str], dimension:int ):
#     expected_length = dimension **2
#     MAX_DIMENSION = 5

#     if dimension > MAX_DIMENSION:
#         raise HTTPException(
#             status_code = status.HTTP_400_BAD_REQUEST,
#             detail=f"Dimension too large. The maximum allowed board dimension is {MAX_DIMENSION}x{MAX_DIMENSION}."
#         )
    
#     if dimension < 3:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail=f"Dimension too small. The minimum allowed board dimension is 3x3."
#         )
#     if expected_length  != len(board):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail=f"Invalid board length. Expected {expected_length} items for a {dimension}x{dimension} grid, but got {len(board)}."
#         )
    
def get_diagonal_list(board:list[str], dimension:int)->list[str]:
    """Creates a list of all the diagonal items in the board"""
    return [board[i*( dimension + 1 )] for i in range(dimension)]

def get_anti_diagonal_list(board:list[str], dimension:int)->list[str]:
    """Creates a list of all the anti-diagonal itmes in the board"""
    return [board[(i+1)*(dimension - 1)] for i in range(dimension)]

def get_row_list(board:list[str], dimension:int, row:int)->list[str]:
    """Creates a list of all the horizontal itmes in the board"""
    return [board[row * dimension + i] for i in range(dimension)]

def get_col_list(board:list[str], dimension:int, col:int)->list[str]:
    """Creates a list of all the vertical itmes in the board"""
    return [board[i * dimension + col] for i in range(dimension)]


def check_board_state(board:list[str], dimension:int)->BoardStateResponse:

    # validate_board_dimension(board, dimension)

    limit = len(board)//dimension
    diagonal_list = []
    anti_diagonal_list = []

    # Diagonals
    for r in range (0, limit):
        row_list = []
        col_list = []
 
        row_list = get_row_list(board, dimension, r) #Horizontal
        col_list= get_col_list(board, dimension, r)   #Vertical 

        if allTheSame(row_list):
            return BoardStateResponse(result=True, config=f"row_{r}", winner=row_list[0])
        if allTheSame(col_list):
            return BoardStateResponse(result=True, config=f"column_{r}", winner=col_list[0])

    diagonal_list = get_diagonal_list(board, dimension)
    anti_diagonal_list = get_anti_diagonal_list(board, dimension)

    if allTheSame(diagonal_list):
        return BoardStateResponse(result=True, config="main_diagonal", winner=diagonal_list[0])
    if allTheSame(anti_diagonal_list):
        return BoardStateResponse(result=True, config="anti_diagonal", winner=anti_diagonal_list[0])
    
    return BoardStateResponse(result=False, config=None, winner=None)