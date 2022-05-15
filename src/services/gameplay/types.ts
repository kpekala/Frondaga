export interface Player {
    id: number;
    name: string;
    is_host: boolean;
}

export interface OccupiedCellData {
    x: number;
    y: number;
    color: string;
}