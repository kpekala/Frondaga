import './EdgeVisual.scss';
import * as React from 'react';
import classNames from 'classnames';
import { LinePosition } from '../common';
import { useInputContext } from '../inputContext';
import { useMemo } from 'react';


interface EdgeVisualProps {
    position: LinePosition;
    color: string;
}

export function EdgeVisual(props: EdgeVisualProps) {
    const { grid, scale } = useInputContext();
    const position = props.position;

    const positionPx = useMemo(() => {
        return position !== null && grid !== null ? {
            col: (position.pos.col) * grid.cellSize * scale,
            row: (position.pos.row) * grid.cellSize * scale,
        } : null;
    }, [position, grid, scale]);

    return positionPx && (
        <div className={classNames('EdgeVisual', `EdgeVisual--${props.position.dir}`)} style={{
            left: `${positionPx.col}px`,
            top: `${positionPx.row}px`,
            backgroundColor: props.color,
        }} />
    );
}