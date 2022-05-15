import * as React from 'react';
import { MenuButtonProps } from './MenuButton';
import "./SendAnswerButton.scss"


export function SendAnswerButton(props: MenuButtonProps) {
    return (
        <button className='SendAnswerButton' onClick={props.onClick}>
            {props.children}
        </button>
    );
}