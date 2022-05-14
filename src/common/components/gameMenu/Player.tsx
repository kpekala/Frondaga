import * as React from 'react';
import './Player.css'

export interface PlayerProps {
    playerName: string
    points: string
    color: string
}

export function Player(props: PlayerProps) {
    return (
        <div className='Player'>
            <div style={{ color: props.color}} className='NameLabel'>{props.playerName}</div>
            <div className='CounterLabel' >{props.points}</div>
        </div>
    );
}