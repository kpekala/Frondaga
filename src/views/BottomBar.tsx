import * as React from 'react';
import './Bottombar.scss'

export interface BottomBarProps {
  players: PlayerProps[]
}

export interface PlayerProps {
  playerName: string, points: number, color: string;
}

export function Player(props: PlayerProps) {
  return (<div className='Player'>
    <div style={{ color: props.color }} className='NameLabel'>{props.playerName}</div>
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