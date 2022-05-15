import './Game.css'

import * as React from 'react';
import { Grid } from './Grid';
import { BottomBar } from './gameMenu/BottomBar';


export function GameView() {
    return (
        <>
            <div className='Game'>
                <Grid rows={10} cols={10} />
            </div>
            <BottomBar players={
                [
                    { name: "kacper", points: "1", color: "red" }, { name: "xxkacper", points: "2x1", color: "green" },
                    { name: "kacper", points: "1", color: "blue" }, { name: "xxkacper", points: "2x1", color: "yellow" },
                    { name: "kacper", points: "1", color: "blue" }, { name: "xxkacper", points: "2x1", color: "yellow" },
                    { name: "kacper", points: "1", color: "blue" }, { name: "xxkacper", points: "2x1", color: "yellow" }
                ]
            } />
        </>
    );
}