import { useState } from "react"
import { sendMove } from "../services/sendMove"
import type { BoardSymbol, CellState } from "../interfaces/CellState";


const createInitialBoard = (gridSize:number) => {
    return Array.from({ length :gridSize * gridSize }, (_,i) => ({
        id:i,
        selected:false,
        symbol: null,
    }));
}

const convertToBackendFormat = (board:CellState[]) => {
    return {
        "dimension":Math.sqrt(board.length),
        "board": board.map( (cell:CellState) => cell.symbol=== null ? "":cell.symbol)
    }
}

const convertToFrontEndFormat = (board:string[]):CellState[] => {
    
    return board.map((item:string, index:number) => item === "" ? 
                                            {id: index, symbol:null, selected:false } : 
                                            {id: index, symbol:item as BoardSymbol, selected:true });

}

export const useGameService = (gridSize:number) => {

    const [isPending, setIsPending]= useState(false);
    const [gameResult, setGameResult]= useState<any>(null);
    const [error, setError]= useState<Error | null>(null);
    //const [gridSize, setGridSize] = useState(gridSize); 
    const [board, setBoard]= useState<CellState[]>(()=> createInitialBoard(gridSize));

    const submitMove = async(id: number) =>{

        if(board[id].selected || isPending) return; 

        const updatedBoard:CellState[] = board.map((cell:CellState) => cell.id == id ? { ...cell, selected:true, symbol:"X" } : cell);


        setBoard(updatedBoard)

        const payload = convertToBackendFormat(updatedBoard);

        try{
            setIsPending(true);
            setError(null);
            const result = await sendMove(JSON.stringify(payload));
            setGameResult(result.game_result);
            setBoard(convertToFrontEndFormat(result.board_status));

        }catch(err:unknown){            
            setError(err instanceof Error ? err : new Error("Something went wrong"));
        }finally{
            setIsPending(false);
        }
    }

    return { isPending, board, error, gameResult, submitMove }
}