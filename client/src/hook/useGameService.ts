import { useState } from "react"
import { sendMove } from "../services/sendMove"
import type { CellState } from "../interfaces/CellState";
import { convertToBackendFormat, convertToFrontEndFormat, createInitialBoard, validate_win } from "../utils/gameUtils";

export const useGameService = (gridSize:number) => {

    const [isPending, setIsPending]= useState(false);
    const [gameResult, setGameResult]= useState<any>(null);
    const [error, setError]= useState<Error | null>(null);
    //const [gridSize, setGridSize] = useState(gridSize); 
    const [board, setBoard]= useState<CellState[]>(()=> createInitialBoard(gridSize));

    const submitMove = async(id: number) =>{

        if(board[id].selected || isPending || (gameResult && gameResult.winner !== null)) return;        

        const updatedBoard:CellState[] = board.map((cell:CellState) => cell.id == id ? { ...cell, selected:true, symbol:"X" } : cell);
        const winnerCheck =  validate_win(updatedBoard);

        if(winnerCheck.winner != null){
            setGameResult(winnerCheck);

            setBoard(updatedBoard);
            return;
        } 

        setBoard(updatedBoard);
        const payload = convertToBackendFormat(updatedBoard);

        try{
            setIsPending(true);
            setError(null);
            const result = await sendMove(JSON.stringify(payload));
            const frontEndFormat = convertToFrontEndFormat(result.board_status);
            setGameResult(validate_win(frontEndFormat));          
            setBoard(frontEndFormat);

        }catch(err:unknown){            
            setError(err instanceof Error ? err : new Error("Something went wrong"));
        }finally{
            setIsPending(false);
        }
    }

    return { isPending, board, error, gameResult, submitMove }
}