import { OSysmbol } from './oSymbol'
import { XSymbol } from './xSymbol'
import type { CellState, GameResult } from "../interfaces/gamesInterfaces";

interface BoardProps  {
  gridSize: number,
  gameResult: GameResult | null,
  board: CellState[],
  submitMove: (id:number) => void
}


export const Board = ({ gridSize,  gameResult, board, submitMove }: BoardProps) => {

  //const {board, submitMove, gameResult} = useGameService(gridSize);

  console.log("gameResult: ", gameResult);

  return (
    <div className="w-full p-4">
      {/* Container scales down smoothly, cells maintain aspect ratio */}
      <div 
        style={{ '--grid-layout': `repeat(${gridSize}, minmax(0, 1fr))` } as React.CSSProperties}
        className="grid grid-cols-(--grid-layout) gap-1 w-full max-w-2xl mx-auto"
      >
        {board.map((cell:CellState) => (
          <div 
            key={cell.id} 
            onClick={()=> submitMove(cell.id)}
            className={`aspect-square ${ gameResult?.winningIndices?.includes(cell.id)
 ? "bg-[oklch(0.84_0.13_143.55)]" : "bg-indigo-200"} text-white flex items-center justify-center text-xs font-bold rounded-sm`}
          >
            {cell.symbol === 'O' && <OSysmbol />}
            {cell.symbol === 'X' && <XSymbol />}

          </div>
        ))}
      </div>
    </div>
  );
}