import * as React from 'react';

export interface PlayerProps {
  name: string
  points: string
}

export function Player(props: PlayerProps) {
    return (
        <div>
            {props.name}: {props.points}
        </div>
    );
}