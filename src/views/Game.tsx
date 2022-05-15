import './Game.css'

import * as React from 'react';
import { Grid } from './Grid';


export function GameView() {
    return (
        <div className='Game'>
            <Grid rows={10} cols={10} />
        </div>
    );
}