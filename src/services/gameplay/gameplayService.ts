import { SOCKET_URL } from '../../config';
import { Logger } from '../../log';
import { PlayerListMessage, RoomCreatedMessage } from './incoming';

export class PlayerSocket {
    private socket: WebSocket;

    constructor(socket: WebSocket) {
        Logger.debug('Player socket created.');

        this.socket = socket;

        // Setting the default handler.
        this.socket.onmessage = (event) => this.defualtMessageHandler(event);
    }

    defualtMessageHandler(event: WebSocketEventMap['message']) {
        console.warn('Received unsuspecting message... hmmmm');
        console.log(event.data);
    }

    getMessage<T>(): Promise<T> {
        return new Promise((resolve) => {
            this.socket.onmessage = (event) => {
                console.log(event.data);
                resolve(JSON.parse(event.data));

                // Reinstating the message handler.
                this.socket.onmessage = (event) => this.defualtMessageHandler(event);
            };
        });
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
    let username: string|null = `bruh-${Math.random()}`;
    let socket: PlayerSocket|null = null;

    return {
        setUsername(_username: string): void {
            username = _username;
        },

        async getMessage<T>(): Promise<T> {
            if (socket === null)
                throw new Error(`Haven't connected yet.`);

            return socket.getMessage();
        },

        async createRoom(): Promise<string> {
            if (username === null) {
                throw new Error(`Username must be defined before creating a room.`);
            }

            socket = await PlayerSocket.create(`${SOCKET_URL}?name=${encodeURIComponent(username)}`);
            
            const msg = await socket.getMessage<RoomCreatedMessage>();
            Logger.debug(`Created room: ${msg.token}`);
            return msg.token;
        },

        async joinRoom(roomToken: string): Promise<PlayerListMessage> {
            if (username === null) {
                throw new Error(`Username must be defined before joining a room.`);
            }

            socket = await PlayerSocket.create(`${SOCKET_URL}?name=${encodeURIComponent(username)}&token=${encodeURIComponent(roomToken)}`);

            return {
                type: 'PLAYER_LIST',
                players: [],
            };
        }
    };
})();