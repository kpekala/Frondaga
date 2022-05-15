import * as React from 'react';
import { useState } from 'react';
import { MenuButton } from "./MenuButton";
import { View } from "./View";
import { PlayPopUp } from './PlayPopUp';
import { GameplayService, Player } from '../services/gameplay';

import './MenuView.scss';
import { GameCancelledMessage, GameStartedMessage, PlayerListMessage } from '../services/gameplay/incoming';
import { GeneralPopUp } from '../common/components/GeneralPopUp';

export interface MenuViewProps {
    children: React.ReactNode;
}

type PopUpType = 'local' | 'net' | 'options' | 'waitingForGame';

export function MenuView() {
    const [popUp, setPopUp] = useState<PopUpType|null>(null);
    const [players, setPlayers] = useState<Player[]>([]);

    const popUpMap: Record<PopUpType, () => React.ReactNode> = {
        'local': () => (
            <PlayPopUp 
                onClose={() => setPopUp(null)}
                onCreateNew={createNewRoom}
                onJoin={joinRoom}
            ></PlayPopUp>
        ),
        'net': () => (
            <PlayPopUp 
                onClose={() => setPopUp(null)}
                onCreateNew={createNewRoom}
                onJoin={joinRoom}
            ></PlayPopUp>
        ),
        options: () => <></>,
        waitingForGame: () => (
            <GeneralPopUp blockBackground style={{
                minWidth: '70vw',
                minHeight: '70vh',
            }}>
                <h2>Gracze:</h2>
                <ol>
                    {players.map(player => <li>{player.name}</li>)}
                </ol>
            </GeneralPopUp>
        )
    };

    async function createNewRoom() {
        const token = await GameplayService.createRoom();

        alert(token);
        setPopUp('waitingForGame');

        let isWaiting = true;
        while (isWaiting) {
            const message = await GameplayService.getMessage<PlayerListMessage|GameStartedMessage|GameCancelledMessage>();

            switch(message.type) {
                case 'PLAYER_LIST':
                    setPlayers(message.players);
                    break;

                case 'START':
                    isWaiting = false;
                    break;
            }
        }
    }

    async function joinRoom(token: string) {
        const response = await GameplayService.joinRoom(token);
        setPlayers(response.players);
        setPopUp('waitingForGame');

        // Populating the local users list, probably returned by useState

        let isWaiting = true;
        while (isWaiting) {
            const message = await GameplayService.getMessage<PlayerListMessage|GameStartedMessage|GameCancelledMessage>();

            switch(message.type) {
                case 'PLAYER_LIST':
                    setPlayers(message.players);
                    break;

                case 'START':
                    isWaiting = false;
                    break;

                case 'QUIT':
                    isWaiting = false;
                    break;
            }
        }
    }

    return (
        <View>
            <div className='MenuView'>
                <span className='logo'>szewc.<span className='letterI'>i</span><span className='letterO'>o</span></span>
                <div className='buttonContainer'>
                    <MenuButton onClick={() => setPopUp('local')}> Graj lokalnie </MenuButton>
                    <MenuButton onClick={() => setPopUp('net')}> Graj przez sieć </MenuButton>
                    <MenuButton onClick={() => setPopUp('options')}> Opcje </MenuButton>
                </div>
            </div>
            {popUp && popUpMap[popUp]()}
        </View>
    );
}