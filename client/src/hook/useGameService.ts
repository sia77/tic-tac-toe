import { useEffect, useState } from "react"
import { sendMove } from "../services/sendMove"
import type { CellState, GameResult } from "../interfaces/gamesInterfaces";
import { convertToBackendFormat, convertToFrontEndFormat, createInitialBoard, validate_win } from "../utils/gameUtils";

export const useGameService = (gridSize:number) => {

    const [isPending, setIsPending]= useState(false);
    const [gameResult, setGameResult]= useState<GameResult | null>(null);
    const [error, setError]= useState<Error | null>(null);
    const [board, setBoard]= useState<CellState[]>(()=> createInitialBoard(gridSize));

    useEffect(()=>{
        setBoard(createInitialBoard(gridSize));
        setError(null);
        setGameResult(null);
    }, [gridSize]);


    const resetGame = () => {
        setBoard(createInitialBoard(gridSize));
        setError(null);
        setGameResult(null);
    }

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

    return { isPending, board, error, gameResult, submitMove, resetGame }
}