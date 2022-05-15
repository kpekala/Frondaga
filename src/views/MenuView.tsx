import * as React from 'react';
import { useEffect, useState } from 'react';
import { MenuButton } from "./MenuButton";
import { View } from "./View";
import { PlayPopUp } from './PlayPopUp';
import { TutorialPopUp } from './TutorialPopUp';
import { GameplayService, Player } from '../services/gameplay';

import './MenuView.scss';
import { GeneralPopUp } from '../common/components/GeneralPopUp';
import { Button } from '../common';
import { Logger } from '../log';

export interface MenuViewProps {
    startGame(): void;
}

type PopUpType = 'local' | 'net' | 'options' | 'waitingForGame' | 'rules';

export function MenuView(props: MenuViewProps) {
    const [popUp, setPopUp] = useState<PopUpType|null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [amIHost, setAmIHost] = useState(false);
    const [roomToken, setRoomToken] = useState<string>('');

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
        'rules': () => (
            <TutorialPopUp
                onClose={() => setPopUp(null)}
            ></TutorialPopUp>
        ),
        options: () => <></>,
        waitingForGame: () => (
            <GeneralPopUp blockBackground style={{
                minWidth: '70vw',
                minHeight: '70vh',
            }}>
                <h4 style={{ textAlign: 'center' }}>{roomToken}</h4>
                <h2>Gracze:</h2>
                <ol>
                    {players.map(player => <li>{player.name}</li>)}
                </ol>
                {amIHost && <Button onClick={() => {
                    GameplayService.startGame();
                }}>Rozpocznik</Button>}
            </GeneralPopUp>
        )
    };

    async function createNewRoom() {
        const token = await GameplayService.createRoom();
        setAmIHost(true);

        setRoomToken(token.roomToken);
        setPopUp('waitingForGame');
    }

    async function joinRoom(token: string) {
        await GameplayService.joinRoom(token);
        setPopUp('waitingForGame');

        setRoomToken(token);
    }

    useEffect(() => {
        const removeHandler = GameplayService.subscribeToPlayers(setPlayers);
        return () => removeHandler();
    }, []);

    useEffect(() => {
        const removeHandler = GameplayService.subscribeToMode((mode) => {
            Logger.info(`Switched to mode ${mode}`);

            props.startGame();
        });
        return () => removeHandler();
    }, []);

    return (
        <View>
            <div className='MenuView'>
                <span className='logo'>szewc.<span className='letterI'>i</span><span className='letterO'>o</span></span>
                <div className='buttonContainer'>
                    <MenuButton onClick={() => setPopUp('local')}> Graj lokalnie </MenuButton>
                    <MenuButton onClick={() => setPopUp('net')}> Graj przez sieć </MenuButton>
                    <MenuButton onClick={() => setPopUp('options')}> Opcje </MenuButton>
                    <MenuButton onClick={() => setPopUp('rules')}> Zasady </MenuButton>
                </div>
            </div>
            {popUp && popUpMap[popUp]()}
        </View>
    );
}