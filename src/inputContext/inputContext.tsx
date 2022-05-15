import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { Position } from '../common';

const InputContext = createContext<InputContext>({
    setGrid() { throw new Error('InputContext not found upstream.'); },

    cursorPosition: null,
    grid: null,
    scale: 1,
});

export interface GridSettings {
    rows: number;
    cols: number;
    /**
     * Base cell size.
     */
    cellSize: number;
}

export interface InputContext {
    setGrid(settings: GridSettings): void;

    cursorPosition: Position|null;
    grid: GridSettings|null;
    /**
     * The zoom amount, multiplicative.
     */
    scale: number;
}

export function InputContextProvider(props: { children: React.ReactNode|React.ReactNode[] }) {
    const [cursorPosition, setCursorPosition] = useState<Position|null>(null);
    const [grid, setGrid] = useState<GridSettings>({
        rows: 10,
        cols: 10,
        cellSize: 60,
    });

    const {rows, cols, cellSize} = grid;

    useEffect(() => {    
        const handleMouseMove = (e: MouseEvent) => {
            // Relative to the center of the screen
            let x = e.clientX - (window.innerWidth / 2);
            let y = e.clientY - (window.innerHeight / 2);

            // Relative to top-left corner of the grid
            x += cellSize * cols / 2;
            y += cellSize * rows / 2;

            // From pixels to grid units
            x /= cellSize;
            y /= cellSize;

            setCursorPosition({
                col: x,
                row: y,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [rows, cols, cellSize]);

    return (
        <InputContext.Provider value={{
            setGrid,
            cursorPosition,
            grid,
            scale: 1,
        }}>
            {props.children}
        </InputContext.Provider>
    );
}

export function useInputContext(): InputContext {
    return useContext(InputContext);
}
