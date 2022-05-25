import './UserInputTestingView.scss';

import * as React from 'react';
import { useEffect } from 'react';
import { UserLineInput } from '../userLineInput/UserLineInput';
import { useInputContext } from '../inputContext/inputContext';
import { GameplayService } from '../services/gameplay';
import { Grid } from './Grid';


export function UserInputTestingView() {
    const {grid} = useInputContext();

    useEffect(() => {
        GameplayService.setUsername('the-player');
        GameplayService.createRoom();
    }, []);

    return (
        <div className='UserInputTestingView'>
            <div className='UserInputTestingView__grid' style={{
                ['--cell-size' as any]: `${grid?.cellSize || 10}px`,
            }}>
                <Grid cellSize={grid?.cellSize || 60} cols={grid?.cols || 0} rows={grid?.rows || 0} />
                <UserLineInput position={null} />
            </div>
        </div>
    );
}
