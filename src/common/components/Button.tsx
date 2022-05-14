import * as React from 'react';
import "./Button.scss"

export interface ButtonProps {
    onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}

export function Button(props: ButtonProps) {
    return (
        <button className='Button' onClick={props.onClick}>
            {props.children}
        </button>
    );
}