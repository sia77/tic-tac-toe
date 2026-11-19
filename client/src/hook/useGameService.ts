import { useEffect, useState } from "react"
import { sendMove } from "../services/sendMove"
import type { CellState, GameResult, GameResultStatus } from "../interfaces/gamesInterfaces";
import { checkBoardState, convertToBackendFormat, convertToFrontEndFormat, createInitialBoard } from "../utils/gameUtils";

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

        if(board[id].selected || isPending || (gameResult && (gameResult.status === "WIN" || gameResult.status === "DRAW"))) return;        

        const updatedBoard:CellState[] = board.map((cell:CellState) => cell.id == id ? { ...cell, selected:true, symbol:"X" } : cell);

        const statusCheck = checkBoardState(updatedBoard);
        setBoard(updatedBoard);

        

        console.group("statusCheck")
        console.table(statusCheck);
        console.groupEnd();

        if(statusCheck.status === "WIN"){
            setGameResult(statusCheck);
            return;
        }

        if(statusCheck.status === "DRAW"){
            setGameResult(statusCheck);
            return;            
        }

        
        const payload = convertToBackendFormat(updatedBoard);

        try{
            setIsPending(true);
            setError(null);
            const result = await sendMove(JSON.stringify(payload));
            const frontEndFormat = convertToFrontEndFormat(result.board_cells);
            setBoard(frontEndFormat);

            if(result['board_state'].status.toUpperCase() === "WIN"){
                const tempStatus:GameResult = {
                    status : result['board_state'].status.toUpperCase(),
                    winner : result['board_state'].winner,
                    winningIndices: result['board_state'].winning_indices,
                    winningLine: result['board_state'].winning_line
                }
                setGameResult(tempStatus);
                return;
            }

            if(result['board_state'].status.toUpperCase() === "DRAW"){
                const tempStatus:GameResult = {
                    status : result['board_state'].status.toUpperCase(),
                    winner : result['board_state'].winner,
                    winningIndices: result['board_state'].winning_indices,
                    winningLine: result['board_state'].winning_line
                }
                setGameResult(tempStatus);
                return;            
            }


        }catch(err:unknown){            
            setError(err instanceof Error ? err : new Error("Something went wrong"));
        }finally{
            setIsPending(false);
        }
    }

    return { isPending, board, error, gameResult, submitMove, resetGame }
}