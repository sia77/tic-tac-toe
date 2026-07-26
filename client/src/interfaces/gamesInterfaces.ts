export type BoardSymbol = 'X' | 'O' | null;

export interface CellState {
    id:number;
    selected:boolean;
    symbol:BoardSymbol;
}

export type GridSizes= 3 | 4 | 5;

export interface GameResult {
    winner: string | null;
    winningIndices: number[] | null;
}
