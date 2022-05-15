export type Position = { col: number, row: number };
export interface LinePosition {
    pos: Position;
    dir: 'right' | 'down';
}
