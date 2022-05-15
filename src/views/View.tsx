import * as React from 'react';
import './View.scss';

export interface ViewProps {
    children: React.ReactNode;
}

export function View(props: ViewProps) {
    return (
        <div className='View'>
            {props.children}
        </div>
    );
}