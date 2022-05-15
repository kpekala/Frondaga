import './UserLineInput.scss';

import * as React from 'react';
import classNames from 'classnames';
import { LinePosition, StylableProps } from '../common';
import { useInputContext } from '../inputContext/inputContext';
import { useMemo } from 'react';

// export interface UserLineInputProps extends StylableProps {
// }

export function UserLineInput(props: StylableProps) {
    const { cursorPosition, grid, scale } = useInputContext();

    const linePosition = useMemo<LinePosition|null>(() => {
        if (grid === null)
            return null;

        const calcGlobal = (() => {
            if (cursorPosition === null)
                return null;

            const ix = cursorPosition.col % 1;
            const iy = cursorPosition.row % 1;

            if (1-iy > ix) {
                // Top-left half
                return {
                    pos: {
                        col: Math.floor(cursorPosition.col),
                        row: Math.floor(cursorPosition.row),
                    },
                    dir: iy > ix ? 'down' as const : 'right' as const,
                };
            }
            else {
                // Bottom-right half

                if (iy > ix) {
                    // Bottom
                    return {
                        pos: {
                            col: Math.floor(cursorPosition.col),
                            row: Math.floor(cursorPosition.row + 1),
                        },
                        dir: 'right' as const,
                    };
                }
                
                // Right
                return {
                    pos: {
                        col: Math.floor(cursorPosition.col + 1),
                        row: Math.floor(cursorPosition.row),
                    },
                    dir: 'down' as const,
                };
            }
        })();

        // Filtering out-of-bounds results
        if (calcGlobal === null ||
            // Obvious bounds
            calcGlobal.pos.col < 0 || calcGlobal.pos.row < 0 ||
            calcGlobal.pos.col >= grid.cols+1 || calcGlobal.pos.row >= grid.rows+1 ||
            // Border-cases
            (calcGlobal.pos.col == grid.cols && calcGlobal.dir === 'right') ||
            (calcGlobal.pos.row == grid.rows && calcGlobal.dir === 'down')
        ) {
            return null;
        }
        
        return calcGlobal;
    }, [cursorPosition, grid]);

    const lineCenterCoordPx = useMemo(() => {
        return linePosition !== null && grid !== null ? {
            col: (linePosition.pos.col) * grid.cellSize * scale,
            row: (linePosition.pos.row) * grid.cellSize * scale,
        } : null;
    }, [linePosition, grid, scale]);

    const cursorPositionPx = useMemo(() => {
        return cursorPosition !== null && grid !== null ? {
            col: Math.floor(cursorPosition.col) * grid.cellSize * scale,
            row: Math.floor(cursorPosition.row) * grid.cellSize * scale,
        } : null;
    }, [cursorPosition, grid, scale]);

    return (
        <>{linePosition && lineCenterCoordPx && (
            <div className={classNames('UserLineInput', props.className)} style={{
                left: `${lineCenterCoordPx.col}px`,
                top: `${lineCenterCoordPx.row}px`,
            }}>
                <div className={classNames('UserLineInput__line-selection',
                    `UserLineInput__line-selection--${linePosition.dir}`)} />
            </div>)
        }</>
    );
}
