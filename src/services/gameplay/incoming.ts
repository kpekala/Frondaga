import { Player as Player } from './types';

export interface InitialGameState {
    order: number[];
    current_player: number;
}

export interface PlayerListMessage {
    type: 'PLAYER_LIST',
    players: Player[];
}

export interface RulesMessage {
    type: 'RULES',
    width: number;
    height: number;
    move_timeout: number;
}

export interface TokenMessage {
    type: 'TOKEN';
    token: string;
    user_id: number;
}

export interface PlayerJoinedMessage {
    type: 'PLAYER_JOINED';
    player: Player;
}

export interface GameStartedMessage {
    type: 'START';
}

export interface GameCancelledMessage {
    type: 'QUIT';
}

export interface AcceptGameMessage {
    type: 'START';
}

export interface Move {
    start_point: { x: number, y: number };
    end_point: { x: number, y: number };
    user: number;
}

export interface ActionMessage {
    move?: Move;
    field?: { point: {x: number, y: number}[] }
    order: {
        order: number[];
        current_player: number;
    };
}
