import './UserLineInput.scss';

import * as React from 'react';
import { StylableProps, Position } from '../common';
import { useInputContext } from '../inputContext/inputContext';

export interface UserLineInputProps extends StylableProps {
    position: Position;
}

export function UserLineInput(props: UserLineInputProps) {
    const inputContext = useInputContext();
    const cursorPosition = inputContext.cursorPosition;

    return (
        <div className='UserLineInput' style={{
            left: `${cursorPosition?.col || 0}rem`,
            top: `${cursorPosition?.row || 0}rem`,
        }}>
            <div className='UserLineInput__dot-cursor' />
        </div>
    );
}
