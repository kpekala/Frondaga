import { Position } from '../../common';

export interface Player {
    id: number;
    name: string;
    is_host: boolean;
}

export interface GamePlayer extends Player {
    color: string;
    points: number;
}

export interface OccupiedCellData {
    x: number;
    y: number;
    color: string;
}

export interface PlayerEdge {
    userId: number;
    start: Position;
    end: Position;
}

export type Mode = 'pre-game' | 'game';
