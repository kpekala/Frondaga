import './GameView.css'

import * as React from 'react';
import { Grid } from './Grid';
import { UserLineInput } from '../userLineInput';
import { InputContextProvider, useInputContext } from '../inputContext';
import { BottomBar } from './BottomBar';
import { OccupiedCell } from './OccupiedCell';
import { OccupiedCellData } from '../services/gameplay';
import { PlayerProps } from './BottomBar';

const players: PlayerProps[] = [
     { playerName: "kacper", points: 1, color: "red" },
     { playerName: "xxkacper", points: 1, color: "green" },
     { playerName: "xxkacper", points: 1, color: "yellow" },
     { playerName: "xxkacper", points: 1 , color: "blue" }
];

export function GameBoard() {
    const {grid} = useInputContext();

    const occupiedCellList: OccupiedCellData[] = [];

    return (
        <div className='GameBoard' style={{
            ['--cell-size' as any]: `${grid?.cellSize || 10}px`,
        }}>
            <Grid cellSize={grid?.cellSize || 60} cols={grid?.cols || 0} rows={grid?.rows || 0} />
            <UserLineInput />
            {occupiedCellList.map(cell => <OccupiedCell x={cell.x} y={cell.y} color={cell.color}></OccupiedCell>)}
        </div>
    );
}

export function GameView() {
    
    return (
        <div className='GameView'>
            <InputContextProvider>
                <GameBoard />
            </InputContextProvider>
            <BottomBar players={players}/>
        </div>
    );
}