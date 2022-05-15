import * as React from 'react';
import './PopUp.scss'


export interface PopUpProps {
    children: React.ReactNode |  React.ReactNode[];
}

export function PopUp(props: PopUpProps) {
    return (
        <div className='PopUp'>
            {props.children}
        </div>
    );
}