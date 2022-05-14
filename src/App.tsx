import * as React from 'react';
import { Button } from "./common/components";
import { GameView } from './views';


function clickMe() {
    console.log("Button is clicked");
}

export function App() {
    return (
        <GameView />
    );
}
