import './UserLineInput.scss';

import * as React from 'react';
import classNames from 'classnames';
import { LinePosition, StylableProps } from '../common';
import { useInputContext } from '../inputContext/inputContext';
import { useMemo } from 'react';

export interface UserLineInputProps extends StylableProps {
    position: LinePosition|null;
}

export function UserLineInput(props: UserLineInputProps) {
    const { grid, scale } = useInputContext();
    const { position } = props;

    const lineCenterCoordPx = useMemo(() => {
        return position !== null && grid !== null ? {
            col: (position.pos.col) * grid.cellSize * scale,
            row: (position.pos.row) * grid.cellSize * scale,
        } : null;
    }, [position, grid, scale]);

    return (
        <>{position && lineCenterCoordPx && (
            <div className={classNames('UserLineInput', props.className)} style={{
                left: `${lineCenterCoordPx.col}px`,
                top: `${lineCenterCoordPx.row}px`,
            }}>
                <div className={classNames('UserLineInput__line-selection',
                    `UserLineInput__line-selection--${position.dir}`)} />
            </div>)
        }</>
    );
}
