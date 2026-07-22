import type { BoardSymbol, CellState } from "../interfaces/gamesInterfaces";

const is_row_col_winner = (board: CellState[]) => {
  const len = Math.sqrt(board.length);

  for (let step = 0; step < len; step++) {
    let tempRow = [];
    let tempCol = [];
    let currentIndicesRow = [];
    let currentIndicesCol = [];

    for (let i = 0; i < len; i++) {
      tempRow[i] = board[len * step + i].symbol;
      currentIndicesRow.push(len * step + i);
      tempCol[i] = board[step + i * len].symbol;
      currentIndicesCol.push(step + i * len);
    }

    if (tempRow[0] !== null && tempRow.every(item => item === tempRow[0])) {
      return {"winner":tempRow[0], "winningIndices": currentIndicesRow };
    }

    if (tempCol[0] !== null && tempCol.every(item => item === tempCol[0])) {
      return {"winner":tempCol[0], "winningIndices": currentIndicesCol };
    }
  }

  return {"winner":null, "winningIndices": [] };
};

const is_diagonal_winner = (board: CellState[]) => {
    const len = Math.sqrt(board.length);
    let tempRow = [];
    let currentIndicesRow = [];

    for (let i = 0; i < len; i++) {
        tempRow[i] = board[i + i * len].symbol;
        currentIndicesRow.push(i + i * len)
    }
    
    if( tempRow[0] !== null && tempRow.every(item => item === tempRow[0]) ){
        return {"winner":tempRow[0], "winningIndices": currentIndicesRow };
    }
    return {"winner":null, "winningIndices": [] };
};

const is_anti_diagonal = (board: CellState[]) => {
    const len = Math.sqrt(board.length);
    let tempRow = [];
    let currentIndicesRow = [];

    for (let i = 0; i < len; i++) {
        tempRow[i] = board[(i + 1) * (len - 1)].symbol;
        currentIndicesRow.push((i + 1) * (len - 1))
    }

    if(tempRow[0] !== null && tempRow.every(item => item === tempRow[0])){
        return {"winner":tempRow[0], "winningIndices": currentIndicesRow };
    }
    return {"winner":null, "winningIndices": [] };
};

export const validate_win = (board: CellState[]) => {
    const rowColCheck = is_row_col_winner(board);
    if( rowColCheck.winner !=null ) return rowColCheck;

    const diagCheck = is_diagonal_winner(board);
    if( diagCheck.winner !=null ) return diagCheck;

    const antiDiagCheck = is_anti_diagonal(board);
    if( antiDiagCheck.winner !=null ) return antiDiagCheck;

    const drawCheck = board.every(cell => cell.selected);
    if(drawCheck) return {"winner":"DRAW", "winningIndices": [] };  

    return {"winner":null, "winningIndices": [] }; 
};

export const createInitialBoard = (gridSize:number) => {
    console.log("creation - gridSize: ", gridSize);
    return Array.from({ length :gridSize * gridSize }, (_,i) => ({
        id:i,
        selected:false,
        symbol: null,
    }));
}

export const convertToBackendFormat = (board:CellState[]) => {
    return {
        "dimension":Math.sqrt(board.length),
        "board": board.map( (cell:CellState) => cell.symbol=== null ? "":cell.symbol)
    }
}

export const convertToFrontEndFormat = (board:string[]):CellState[] => {
    
    return board.map((item:string, index:number) => item === "" ? 
                                            {id: index, symbol:null, selected:false } : 
                                            {id: index, symbol:item as BoardSymbol, selected:true });

}
