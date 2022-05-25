import * as React from 'react';
import "./AnswerButton.scss"

export interface AnswerButtonProps {
    onClick: (answer: string) => void;
    value: string;
}

export function AnswerButton(props: AnswerButtonProps) {
    return (
        <button className='AnswerButton' onClick={() =>{props.onClick(props.value)}}>
            {props.value}
        </button>
    );
}