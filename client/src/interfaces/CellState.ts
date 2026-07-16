export type BoardSymbol = 'X' | 'O' | null;

export interface CellState {
    id:number;
    selected:boolean;
    symbol:BoardSymbol;
}
