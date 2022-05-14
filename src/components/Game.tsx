import * as React from 'react';
import { Button } from '_/common/components';
import {Grid} from './grid/Grid';
import './Game.css'


export function Game(props: any) {
    return (
        <div className='Game'>
            <Grid onClick={() => {null;}}/>
        </div>
    );
}