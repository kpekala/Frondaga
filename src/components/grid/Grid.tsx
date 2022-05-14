import * as React from 'react';
import './Grid.css';

interface GridProps{
    onClick: () => void;
}

export class Grid extends React.Component<GridProps>{

    constructor(props: GridProps){
        super(props);
    }

    renderRow(columnsSize: number){
        const squares = [];
        for(let i=0; i<columnsSize; i++){
            squares.push(Square({}));
        }

        return (<div className="board-row">
            {squares} 
        </div>);
    }

    renderGrid(rowSize: number, columnsSize: number){
        const rows = [];
        for(let i=0; i<rowSize; i++){
            rows.push(this.renderRow(columnsSize));
        }

        return rows;
    }
    render(){
        return (
        <div className='Grid'>
            {this.renderGrid(10,10)}
        </div>
        );
    }
}

function Square(props: any) {
    return (
      <div className="Square"
       onClick={props.onClick}>
      </div>
    );
}

