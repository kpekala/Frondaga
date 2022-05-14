import * as React from 'react';

export interface PlayerProps {
  playerName: string
  points: string
  color: string
}

export function Player(props: PlayerProps) {
    return (
        <div className='Player' style={{color: props.color}}>
            {props.playerName}: {props.points}
        </div>
    );
}