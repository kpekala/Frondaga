import { Position } from '../../common';
import { SOCKET_URL } from '../../config';
import { Logger } from '../../log';
import { ActionMessage, GameCancelledMessage, GameStartedMessage, InitialGameState, Move, PlayerListMessage, TokenMessage } from './incoming';
import { MoveCommand, StartGameMessage } from './outgoing';
import { GamePlayer, Player, OccupiedCellData, PlayerEdge, Mode } from './types';

export class PlayerSocket {
    private socket: WebSocket;
    private messageQueue: unknown[] = [];

    constructor(socket: WebSocket) {
        Logger.debug('Player socket created.');

        this.socket = socket;

        // Setting the default handler.
        this.socket.onmessage = (event) => this.defualtMessageHandler(event);
    }

    defualtMessageHandler(event: WebSocketEventMap['message']) {
        console.warn('Received unsuspecting message... hmmmm');
        console.log(event.data);

        this.messageQueue.push(JSON.parse(event.data));
    }

    getMessage<T>(): Promise<T> {
        if (this.messageQueue.length > 0) {
            return Promise.resolve(this.messageQueue.splice(0, 1)[0] as T);
        }

        return new Promise((resolve) => {
            this.socket.onmessage = (event) => {
                console.log(event.data);
                resolve(JSON.parse(event.data));

                // Reinstating the message handler.
                this.socket.onmessage = (event) => this.defualtMessageHandler(event);
            };
        });
    }

    send(msg: string): void {
        this.socket.send(msg);
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

export interface UserConnectionData {
    roomToken: string;
    userId: number;
}

export const GameplayService = (() => {
    const playerListeners = new Set<(players: GamePlayer[])=>void>();
    const cellListeners = new Set<(cells: OccupiedCellData[])=>void>();
    const edgesListeners = new Set<(edges: PlayerEdge[])=>void>();
    const modeListeners = new Set<(mode: Mode)=>void>();

    let mode: Mode = 'pre-game';
    let username: string|null = null;
    let socket: PlayerSocket|null = null;
    let connectionData: UserConnectionData|null = null;
    let players: GamePlayer[] = [];
    let playOrder: number[] = [];
    const edges: PlayerEdge[] = [];
    let currentPlayerId = 0;

    const setRawPlayers = (rawPlayers: Player[]): void => {
        players = rawPlayers.map(raw => ({
            ...raw,
            color: ['#ff0000', '#00ff00', '#0000ff', '#ff3344'][raw.id],
            points: 0,
        }));

        console.log(players);

        playerListeners.forEach(l => l(players));
    };

    const addEdge = (data: Required<ActionMessage['move']>) => {
        if (data === undefined)
            return;

        edges.push({
            userId: data.user,
            start: { col: data.start_point.x, row: data.start_point.y },
            end: { col: data.end_point.x, row: data.end_point.y },
        });

        console.log(edges);

        edgesListeners.forEach(l => l(edges));
    };

    const setMode = (_mode: Mode) => {
        mode = _mode;

        modeListeners.forEach(l => l(mode));
    };

    return {
        setUsername(_username: string): void {
            username = _username;
        },

        async getMessage<T>(): Promise<T> {
            if (socket === null)
                throw new Error(`Haven't connected yet.`);

            return socket.getMessage();
        },

        async sendMessage<T>(msg: T): Promise<void> {
            if (socket === null)
                throw new Error(`Haven't connected yet.`);

            return socket.send(JSON.stringify(msg));
        },

        async createRoom(): Promise<UserConnectionData> {
            if (username === null) {
                throw new Error(`Username must be defined before creating a room.`);
            }

            socket = await PlayerSocket.create(`${SOCKET_URL}?name=${encodeURIComponent(username)}`);
            
            const msg = await socket.getMessage<TokenMessage>();
            Logger.debug(`Created room: ${msg.token}`);
            connectionData = {
                roomToken: msg.token,
                userId: msg.user_id,
            };

            (async () => {
                // Getting sequential player joins, the game start or game quit.
                let isWaiting = true;
                while (isWaiting) {
                    const message = await this.getMessage<PlayerListMessage|GameStartedMessage>();
        
                    switch(message.type) {
                        case 'PLAYER_LIST':
                            setRawPlayers(message.players);
                            break;
        
                        case 'START':
                            isWaiting = false;
                            this.sendMessage<StartGameMessage>({ type: 'START' });
                            setMode('game');
                            break;
                    }
                }
            })();
            
            return connectionData;
        },

        async joinRoom(roomToken: string): Promise<UserConnectionData> {
            if (username === null) {
                throw new Error(`Username must be defined before joining a room.`);
            }

            socket = await PlayerSocket.create(`${SOCKET_URL}?name=${encodeURIComponent(username)}&token=${encodeURIComponent(roomToken)}`);

            // Awaiting join confirmation
            const msg = await socket.getMessage<TokenMessage>();
            Logger.debug(`Joined room: ${msg.token}`);
            connectionData = {
                roomToken: msg.token,
                userId: msg.user_id,
            };

            (async () => {
                // Getting sequential player joins, the game start or game quit.
                let isWaiting = true;
                while (isWaiting) {
                    const message = await this.getMessage<PlayerListMessage|GameStartedMessage|GameCancelledMessage>();
        
                    switch(message.type) {
                        case 'PLAYER_LIST':
                            setRawPlayers(message.players);
                            break;
        
                        case 'START':
                            isWaiting = false;
                            this.sendMessage<StartGameMessage>({ type: 'START' });
                            setMode('game');
                            break;
        
                        case 'QUIT':
                            isWaiting = false;
                            break;
                    }
                }
            })();

            return connectionData;
        },

        subscribeToPlayers(callback: (players: GamePlayer[]) => void): () => void {
            playerListeners.add(callback);

            callback(players);
            return () => playerListeners.delete(callback);
        },

        subscribeToCellData(callback: (cells: OccupiedCellData[]) => void): () => void {
            cellListeners.add(callback);

            return () => cellListeners.delete(callback);
        },

        subscribeToEdges(callback: (edges: PlayerEdge[]) => void): () => void {
            edgesListeners.add(callback);

            return () => edgesListeners.delete(callback);
        },

        subscribeToMode(callback: (mode: Mode) => void): () => void {
            modeListeners.add(callback);

            return () => modeListeners.delete(callback);
        },

        async handleGame(): Promise<void> {
            const { order, current_player } = await this.getMessage<InitialGameState>();
            playOrder = order;
            currentPlayerId = current_player;
            console.log(`Got the initial game state: { order: ${playOrder}, current_player: ${current_player}`);

            // Getting sequential player moves, the game start or game quit.
            const isWaiting = true;
            while (isWaiting) {
                const message = await this.getMessage<ActionMessage>();
                
                console.log({
                    actionMessage: message,
                });

                playOrder = message.player_order.order;
                currentPlayerId = message.player_order.current_player;

                if (message.move) {
                    addEdge(message.move);
                }
            }
        },

        startGame(): void {
            this.sendMessage<StartGameMessage>({ type: 'START' });
        },

        addEdge(start: Position, end: Position): void {
            this.sendMessage<MoveCommand>({
                type: 'MOVE',
                start_point: { x: start.col, y: start.row },
                end_point: { x: end.col, y: end.row },
                user: 0,
            });

            addEdge({
                start_point: { x: start.col, y: start.row },
                end_point: { x: end.col, y: end.row },
                user: connectionData?.userId || -1,
            })
        },
        
        setMode,
    };
})();