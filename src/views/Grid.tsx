import * as React from 'react';
import './Grid.css';

interface GridProps {
    rows: number;
    cols: number;
    cellSize: number;
}

function renderRow(cols: number, cellSize: number) {
    const squares = [];
    for (let i = 0; i < cols; i++) {
        squares.push(<div className="Square" style={{
            width: `${cellSize + 1}px`,
            height: `${cellSize + 1}px`,
        }} />);
    }

    return (
        <div className="Grid__row">
            {squares}
        </div>
    );
}

export function Grid(props: GridProps) {
    const rows = [];
    for (let i = 0; i < props.rows; i++) {
        rows.push(renderRow(props.cols, props.cellSize));
    }

    return (
        <div className='Grid'>
            {rows}
        </div>
    );
}
