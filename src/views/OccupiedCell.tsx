import * as React from 'react';
import './OccupiedCell.scss'

export interface OccupiedCellProps {
    x: number;
    y: number;
    color: string;
}

export function OccupiedCell(props: OccupiedCellProps) {
    return ( <div className='OccupiedCell' style={{
        backgroundColor: props.color,
        position: "absolute",
        left: props.x,
        top: props.y
    }}></div>);
}