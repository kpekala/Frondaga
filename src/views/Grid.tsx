import * as React from 'react';
import './Grid.css';

interface GridProps {
    rows: number;
    cols: number;
}

function renderRow(columnsSize: number) {
    const squares = [];
    for (let i = 0; i < columnsSize; i++) {
        squares.push(<div className="Square" />);
    }

    return (
        <div className="Grid__row">
            {squares}
        </div>
    );
}

export class Grid extends React.Component<GridProps>{
    constructor(props: GridProps) {
        super(props);
    }

    renderGrid(rowSize: number, columnsSize: number) {
        const rows = [];
        for (let i = 0; i < rowSize; i++) {
            rows.push(renderRow(columnsSize));
        }

        return rows;
    }

    render() {
        return (
            <div className='Grid'>
                {this.renderGrid(this.props.rows, this.props.cols)}
            </div>
        );
    }
}
