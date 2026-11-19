import type { BoardSymbol, CellData, CellState, GameResult } from "../interfaces/gamesInterfaces";


const getRowData = (board: CellState[], row:number, len:number):CellData => {
    let start = row*len;
    //return board.slice(start, start+len).map(cell => cell.symbol);
    return {
        "cells": board.slice(start, start+len).map(cell => cell.symbol),
        "indices": Array.from({ length: len }, (_, i) => start + i)
    }
}

const getColData = (board: CellState[], col:number, len:number):CellData => {
    const list:BoardSymbol[] = [];
    for(let i = 0; i<len; i++){
        list.push(board[col+len*i].symbol);
    }
    return {
        "cells":list,
        "indices": Array.from({length:len}, (_, i) => col+len*i )
    }
}

const getDiagonalData = (board: CellState[], len:number):CellData => {
    const list:BoardSymbol[] = [];
    for(let i=0; i<len; i++){
        list.push(board[i*(len+1)].symbol);
    }
    return {
        "cells": list,
        "indices":Array.from({length:len}, (_,i)=> i*(len+1) )
    }
}

const getAntiDiagonalData = (board: CellState[], len:number):CellData => {
    const list:BoardSymbol[] = [];
    const start =len-1;
    for(let i=0; i<len; i++){
        list.push(board[i*(len-1) +start].symbol)
    }
    return {
        "cells": list,
        "indices": Array.from({length:len }, (_, i) => i*(len-1) +start )
    } 
}


const allLines = function* (board: CellState[]): Generator<[string, CellData]> {
    const len = Math.sqrt(board.length);
    
    for(let i=0; i<len; i++){
        yield [`row_${i}`, getRowData(board, i, len)];
        yield [`col_${i}`, getColData(board, i, len)];
    }
    yield ["main_diagonal", getDiagonalData(board, len)];
    yield ["anti_diagnal", getAntiDiagonalData(board, len)];

};

export const checkBoardState = (board: CellState[]):GameResult => {
    let all_deadlocked = true;

    for (const [lineId, data] of allLines(board)) {        
        if(allTheSame(data['cells'])){
            return {
                status:"WIN",
                winner:data['cells'][0], 
                winningIndices: data['indices'], 
                winningLine:lineId 
            };
        }

        if(!isLineDeadlocked(data['cells'])){
            all_deadlocked=false;
        }
    }

    //console.log("all_deadlocked: ", all_deadlocked);
    if(all_deadlocked){
        return {
            status:"DRAW",
            winner:null, 
            winningIndices: [], 
            winningLine:null 
        };
    }
    //return in_progress
    return {
        status:"IN_PROGRESS",
        winner:null, 
        winningIndices: [],
        winningLine:null
    };

}

const allTheSame = (cells:BoardSymbol[]):boolean => {
    if (cells.length === 0 || cells[0] === null || [" ", ""].includes(cells[0])) {
        return false;
    }
    return cells.every(el => el === cells[0]);
}

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
      return {status:"win","winner":tempRow[0], "winningIndices": currentIndicesRow };
    }

    if (tempCol[0] !== null && tempCol.every(item => item === tempCol[0])) {
      return {status:"win","winner":tempCol[0], "winningIndices": currentIndicesCol };
    }
    
  }

  return {status:"inProgress", "winner":null, "winningIndices": [] };
};

const isLineDeadlocked = (list: (string | null)[]): boolean => {
    //console.log("list: ", list);
    const has_x = list?.includes("X") ?? false;
    const has_o = list?.includes("O") ?? false;
    return has_x && has_o;
};

const is_diagonal_winner = (board: CellState[]) => {
    const len = Math.sqrt(board.length);
    let tempRow = [];
    let currentIndicesRow = [];
    let has_X_r, has_O_r = false;

    for (let i = 0; i < len; i++) {
        tempRow[i] = board[i + i * len].symbol;
        currentIndicesRow.push(i + i * len)
    }

    has_X_r = tempRow.includes("X");
    has_O_r = tempRow.includes("O");
    
    if( tempRow[0] !== null && tempRow.every(item => item === tempRow[0]) ){
        return {status:"win", "winner":tempRow[0], "winningIndices": currentIndicesRow };
    }

    if( has_X_r && has_O_r){
        //console.log("**** A draw is detecte... - diagonal");
        return {status:"draw", "winner":null, "winningIndices": []}
    }
    return {status:"inProgress", "winner":null, "winningIndices": [] };
};

const is_anti_diagonal = (board: CellState[]) => {
    const len = Math.sqrt(board.length);
    let tempRow = [];
    let currentIndicesRow = [];
    let has_X_r, has_O_r = false;

    for (let i = 0; i < len; i++) {
        tempRow[i] = board[(i + 1) * (len - 1)].symbol;
        currentIndicesRow.push((i + 1) * (len - 1))
    }

    has_X_r = tempRow.includes("X");
    has_O_r = tempRow.includes("O");

    if(tempRow[0] !== null && tempRow.every(item => item === tempRow[0])){
        return {status:"draw", "winner":tempRow[0], "winningIndices": currentIndicesRow };
    }

    if( has_X_r && has_O_r){
        //console.log("**** A draw is detecte... - anti_diagonal");
        return {status:"draw", "winner":null, "winningIndices": []}

    }
    return {status:"draw", "winner":null, "winningIndices": [] };
};

// export const validate_win = (board: CellState[]) => {

//     // console.log("---------------------");
//     //const temp = checkBoardState(board);
//     // console.log("Temp result: ", temp);
//     // console.log("---------------------");

//     const rowColCheck = is_row_col_winner(board);
//     if( rowColCheck.winner !=null ) return rowColCheck;

//     const diagCheck = is_diagonal_winner(board);
//     if( diagCheck.winner !=null ) return diagCheck;

//     const antiDiagCheck = is_anti_diagonal(board);
//     if( antiDiagCheck.winner !=null ) return antiDiagCheck;

// };

export const createInitialBoard = (gridSize:number) => {
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
