
def allTheSame(lst):

    if lst[0] == " ":
        return False
    
    for i in range(1,len(lst)):
        if lst[0] != lst[i]:
            return False

    return True

def board_validation():
    # Your 1D test board
    board = [
        " ", "X", "X",
        "O", "X", "O",
        "O", "X", "X"
    ]

    limit = len(board)//3
    diagonal_list = []
    anti_diagonal_list = []

    winner = None
    # Diagnally 
    print("---------------Everything--------------")
    for r in range (0, limit):
        # print(f"{r, r}: {board[r * limit + r]}\n")     #diagonal
        diagonal_list.append(board[r * limit + r])        

        # print(f"{r, limit-r-1}: {board[r * limit + (limit -r-1)]}\n") #anti-diagonal
        anti_diagonal_list.append(board[r * limit + (limit -r-1)]) 

        row_list = []
        col_list = []

        for c in range(0, limit):
            # print(f"{r, c}: {board[r*3+c]}\n")      #Horizontal
            row_list.append(board[r*3+c])
            # print(f"{c, r}: {board[r+c*3]}\n")      #Vertical
            col_list.append(board[r+c*3])    

        if allTheSame(row_list):
            return {"result": True, "config": f"row_{r}", "winner": row_list[0]}
        if allTheSame(col_list):
            return {"result": True, "config": f"column_{r}", "winner": col_list[0]}

    if allTheSame(diagonal_list):
        return {"result": True, "config": "main_diagonal", "winner": diagonal_list[0]}
    if allTheSame(anti_diagonal_list):
        return {"result": True, "config": "anti_diagonal", "winner": anti_diagonal_list[0]}
    
    return {"result": False, "config": None, "winner": None}

result = board_validation()

print(f"*************** {result} ***************")