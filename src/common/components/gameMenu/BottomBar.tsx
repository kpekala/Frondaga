import * as React from 'react';
import { Player } from './Player';
import './BottomBar.css'

export interface BottomBarProps {
  players: {name: string, points: string, color: string}[]
}

export function BottomBar(props: BottomBarProps) {
  return (
    <div className="BottomBar">
      {
        props.players.map(player => <Player playerName={player.name} points={player.points} color={player.color}/>)
      }
    </div>
  );
}