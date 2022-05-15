import './Game.css'

import * as React from 'react';
import { Grid } from '../grid/Grid';


export function GameView() {
    return (
        <div className='Game'>
            <Grid rows={10} cols={10} cellSize={60} />
        </div>
    );
}