import { OSysmbol } from './oSymbol'
import { XSymbol } from './xSymbol'
import type { CellState } from "../interfaces/CellState";
import { useGameService } from '../hook/useGameService';


export const Board = ({ gridSize }: { gridSize: number }) => {

  const {board, submitMove, gameResult} = useGameService(gridSize);

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
            className="aspect-square bg-indigo-200 text-white flex items-center justify-center text-xs font-bold rounded-sm"
          >
            {cell.symbol === 'O' && <OSysmbol />}
            {cell.symbol === 'X' && <XSymbol />}

          </div>
        ))}
      </div>
    </div>
  );
}