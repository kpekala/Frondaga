import * as React from 'react';
import { Button } from "./common/components";
import { Game } from './components';

function clickMe() {
    console.log("Button is clicked");
}

export function App() {
    return (
        <Game/>
    );
}
