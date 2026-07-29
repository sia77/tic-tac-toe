import { useEffect, useState } from "react";
import { Board } from "./board"
import { createInitialBoard } from "../utils/gameUtils";
import type { CellState, GameResult } from "../interfaces/gamesInterfaces";

const play:CellState[] = [
    {id: 0, symbol:'X', selected:true }, {id: 1, symbol:'O', selected:true },
    {id: 4, symbol:'X', selected:true }, {id: 2, symbol:'O', selected:true },
    {id: 8, symbol:'X', selected:true }];

export const LoadingBoard = ({isPending:_isPending}:{isPending:boolean}) => {

    const gridSize = 3;
    const [board, setBoard]= useState<CellState[]>(()=> createInitialBoard(gridSize));
    const [gameResult]= useState<GameResult | null>(null);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= play.length) { 
                i = 0;
                setBoard(createInitialBoard(gridSize)); // reset, then loop continues
                return;
            }

            const currentMove = play[i]
            
            setBoard(prev => {
                return prev.map((cell:CellState) => {
                    if (cell?.id === currentMove?.id){
                        console.log(`${currentMove?.symbol} -  ${currentMove?.id} - i: ${i}`);
                        return {
                            ...cell,
                            symbol: currentMove.symbol,
                            selected: currentMove.selected
                        }
                    }else{
                        return cell;
                    } 
                });
            })
            i++;
        }, 2000);

        return () => clearInterval(interval); 
        }, []);

    const submitMove = async(_id: number) =>{
        return;
    }

    return (
        
        <>
            
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 rounded-xl transition-all">
                <div className="p-4 bg-white/90 shadow-xl rounded-2xl border border-slate-200/80">
                <Board 
                    gridSize={gridSize}
                    gameResult = {gameResult}
                    board = {board}
                    submitMove = {submitMove}
                    size = 'compact'></Board>
                    <p className="text-center text-xs font-semibold text-slate-500 mt-2 animate-pulse">
          Thinking...
        </p>
                </div>

            </div>
            
        </>
    )
}