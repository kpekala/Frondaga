import './GameView.css'

import * as React from 'react';
import { Grid } from './Grid';
import { UserLineInput } from '../userLineInput';
import { InputContextProvider, useInputContext } from '../inputContext';
import { BottomBar } from './BottomBar';
import { OccupiedCell } from './OccupiedCell';
import { GamePlayer, GameplayService, OccupiedCellData, PlayerEdge } from '../services/gameplay';
import { useEffect, useMemo, useState } from 'react';
import { LinePosition, Position } from '../common';
import { Logger } from '../log';
import { EdgeVisual } from './EdgeVisual';


const mockData: GamePlayer[] = [
    { id: 0, name: "kacper", points: 1, color: "red", is_host: true },
    { id: 1, name: "xxkacper", points: 1, color: "green", is_host: false },
    { id: 2, name: "xxkacper", points: 1, color: "yellow", is_host: false },
    { id: 3, name: "xxkacper", points: 1 , color: "blue", is_host: false }
];

export interface GameBoardProps {
    occupiedCellList: OccupiedCellData[];
    edges: VisEdge[]
    onEdgeSelected(start: Position, end: Position): void;
}

export function GameBoard(props: GameBoardProps) {
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

    const occupiedCellList: OccupiedCellData[] = props.occupiedCellList;

    return (
        <div className='GameBoard' style={{
            ['--cell-size' as any]: `${grid?.cellSize || 10}px`,
        }} onClick={() => {
            if (linePosition === null) {
                Logger.warn('Klikasz poza plansze');
                return;
            }

            if (linePosition.dir === 'down') {
                props.onEdgeSelected(linePosition.pos, {col: linePosition.pos.col, row: linePosition.pos.row+1});
            }
            else {
                props.onEdgeSelected(linePosition.pos, {col: linePosition.pos.col+1, row: linePosition.pos.row});
            }
        }}>
            <Grid cellSize={grid?.cellSize || 60} cols={grid?.cols || 0} rows={grid?.rows || 0} />
            <UserLineInput position={linePosition} />
            {occupiedCellList.map((cell, idx) => <OccupiedCell key={idx} x={cell.x} y={cell.y} color={cell.color}></OccupiedCell>)}
            {props.edges.map((edge, idx) => (<EdgeVisual key={idx} position={edge.position} color={edge.color} />))}
        </div>
    );
}

interface VisEdge {
    position: LinePosition;
    color: string;
}

export function GameView() {
    const [players, setPlayers] = useState<GamePlayer[]>([]);
    const [cells, setCells] = useState<OccupiedCellData[]>([]);
    const [edges, setEdges] = useState<VisEdge[]>([]);

    useEffect(() => {
        const removeHandler = GameplayService.subscribeToPlayers(setPlayers);
        return () => removeHandler();
    }, []);

    useEffect(() => {
        const removeHandler = GameplayService.subscribeToCellData(setCells);
        return () => removeHandler();
    }, []);

    useEffect(() => {
        const removeHandler = GameplayService.subscribeToEdges((edges) => {
            setEdges(edges.map(e => ({
                position: {
                    pos: e.start,
                    dir: e.end.col > e.start.col ? 'right' : 'down',
                },
                color: '#ff0000',
            })));
        });
        return () => removeHandler();
    }, []);

    useEffect(() => {
        GameplayService.handleGame();
    }, []);

    const handleEdge = (start: Position, end: Position) => {
        GameplayService.addEdge(start, end);
    };
    
    return (
        <div className='GameView'>
            <InputContextProvider>
                <GameBoard occupiedCellList={cells} onEdgeSelected={handleEdge} edges={edges} />
            </InputContextProvider>
            <BottomBar players={players}/>
        </div>
    );
}