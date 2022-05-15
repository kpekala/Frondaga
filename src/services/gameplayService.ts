import { SOCKET_URL } from '../config';
import { Logger } from '../log';

export interface InitialGameState {
    some: number;
}

export class PlayerSocket {
    private socket: WebSocket;

    constructor(socket: WebSocket) {
        Logger.debug('Player socket created.');

        this.socket = socket;

        this.socket.onmessage = (event) => {
            console.log(event.data);
        };
    }

    close() {
        this.socket.close();
    }

    static create(path: string): Promise<PlayerSocket> {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(path);

            socket.onopen = (event) => {
                resolve(new PlayerSocket(socket));
            };

            socket.onerror = (event) => {
                reject(event);
            };
        });
    }
}

export const GameplayService = (() => {
    let username: string|null = null;
    let socket: PlayerSocket|null = null;

    return {
        setUsername(_username: string): void {
            username = _username;
        },

        async createRoom() {
            if (username === null) {
                throw new Error(`Username must be defined before creating a room.`);
            }

            socket = await PlayerSocket.create(`${SOCKET_URL}?name=${encodeURIComponent(username)}`);
        },

        async joinRoom(roomToken: string) {
            if (username === null) {
                throw new Error(`Username must be defined before joining a room.`);
            }

            socket = await PlayerSocket.create(`${SOCKET_URL}?name=${encodeURIComponent(username)}&token=${encodeURIComponent(roomToken)}`);
        }
    };
})();