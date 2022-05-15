import * as React from 'react';
import "./LoginButton.scss"

export interface LoginButtonProps {
    onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}

export function LoginButton(props: LoginButtonProps) {
    return (
        <button className='LoginButton' onClick={props.onClick}>
            {props.children}
        </button>
    );
}