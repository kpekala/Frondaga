import './Bottombar.scss';

import * as React from 'react';
import { GamePlayer } from '../services/gameplay';

export interface BottomBarProps {
    players: GamePlayer[]
}

export function Player(props: GamePlayer) {
    return (<div className='Player'>
        <div style={{ color: props.color }} className='NameLabel'>{props.name}</div>
        <div className='CounterLabel' >{props.points}</div>
    </div>);
}

export function BottomBar(props: BottomBarProps) {
    const playerViews = props.players.map(p => <Player {...p} />);

    return (
        <div className="BottomBar">
            {playerViews}
        </div>
    );
}