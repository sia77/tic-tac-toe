export type BoardSymbol = 'X' | 'O' | null;

export interface CellState {
    id:number;
    selected:boolean;
    symbol:BoardSymbol;
}

export interface CellData {
    cells:BoardSymbol[];
    indices:number[];
}

export type GridSizes= 3 | 4 | 5;
export type GameResultStatus = "WIN" | "IN_PROGRESS" | "DRAW";

export interface GameResult {
    status:GameResultStatus;
    winner: string | null;
    winningIndices: number[] | null;
    winningLine: string | null;
}
