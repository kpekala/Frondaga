import * as React from 'react';
import "./MenuButton.scss"

export interface MenuButtonProps {
    onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}

export function MenuButton(props: MenuButtonProps) {
    return (
        <button className='MenuButton' onClick={props.onClick}>
            {props.children}
        </button>
    );
}