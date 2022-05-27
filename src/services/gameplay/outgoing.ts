import { Move } from './incoming';

export interface PlayerQuitMessage {
    type: 'QUIT';
}

export interface StartGameMessage {
    type: 'START';
}

export interface MoveCommand extends Move {
    type: 'MOVE',
}
