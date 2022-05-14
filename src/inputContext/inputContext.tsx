import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { Position } from '../common';

const InputContext = createContext<InputContext>({
    cursorPosition: null,
});

export interface InputContext {
    cursorPosition: Position|null;
}

export function InputContextProvider(props: { children: React.ReactNode|React.ReactNode[] }) {
    const [cursorPosition, setCursorPosition] = useState<Position|null>(null);
    
    const gridSizePx = 60;

    useEffect(() => {    
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPosition({
                col: Math.floor(e.clientX / gridSizePx),
                row: Math.floor(e.clientY / gridSizePx),
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        console.log(cursorPosition);
    }, [cursorPosition]);

    return (
        <InputContext.Provider value={{
            cursorPosition,
        }}>
            {props.children}
        </InputContext.Provider>
    );
}

export function useInputContext(): InputContext {
    return useContext(InputContext);
}
