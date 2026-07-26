import { OSymbol } from './OSymbol'
import { XSymbol } from './XSymbol'
import type { CellState, GameResult, GridSizes } from "../interfaces/gamesInterfaces";

interface BoardProps  {
  gridSize: GridSizes,
  gameResult: GameResult | null,
  board: CellState[],
  submitMove: (id:number) => void,
  size?: 'default' | 'compact';
}

  const sizeStyles = {
    default:'max-w-2xl', 
    compact:'max-w-[80px]'
  };

export const Board = ({ gridSize,  gameResult, board, submitMove, size = 'default' }: BoardProps) => {

  const styles = sizeStyles[size];

  return (
    <div className="w-full p-4">
      <div 
        style={{ '--grid-layout': `repeat(${gridSize}, minmax(0, 1fr))` } as React.CSSProperties}
        className={`grid grid-cols-(--grid-layout) gap-1 w-full ${styles} mx-auto`}
      >
        {board.map((cell:CellState) => (
          <div 
            key={cell.id} 
            onClick={()=> submitMove(cell.id)}
            className={`aspect-square ${ gameResult?.winningIndices?.includes(cell.id)
 ? "bg-[oklch(0.84_0.13_143.55)]" : "bg-indigo-200"} text-white flex items-center justify-center text-xs font-bold rounded-sm`}
          >
            {cell.symbol === 'O' && <OSymbol size={size} />}
            {cell.symbol === 'X' && <XSymbol size={size} />}

          </div>
        ))}
      </div>
    </div>
  );
}