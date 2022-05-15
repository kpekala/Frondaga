import './GameView.css'

import * as React from 'react';
import { Grid } from './Grid';
import { UserLineInput } from '../userLineInput';
import { InputContextProvider, useInputContext } from '../inputContext';


export function GameBoard() {
    const {grid} = useInputContext();

    return (
        <div className='GameBoard' style={{
            ['--cell-size' as any]: `${grid?.cellSize || 10}px`,
        }}>
            <Grid cellSize={grid?.cellSize || 60} cols={grid?.cols || 0} rows={grid?.rows || 0} />
            <UserLineInput />
        </div>
    );
}

export function GameView() {
    return (
        <div className='GameView'>
            <InputContextProvider>
                <GameBoard />
            </InputContextProvider>
        </div>
    );
}