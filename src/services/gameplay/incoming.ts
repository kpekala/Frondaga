import { Player as Player } from './types';

export interface InitialGameState {
    some: number;
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

export interface RoomCreatedMessage {
    type: 'TOKEN';
    token: string;
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
