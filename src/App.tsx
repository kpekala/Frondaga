import * as React from 'react';
import { useState } from 'react';
import { Button } from "./common/components";
import { MenuView } from "./views";
import { GameView } from './views';
import { Checkbox } from "./common/components";


function clickMe() {
    console.log("Button is clicked");
}

export function App() {
    const [checked, setChecked] = useState(false);
    
    return (
        <div>
            <h1>Hello! Urodaga here</h1>
            <MenuView />
            <GameView />
            <Button onClick={clickMe}>
                Click me!
            </Button>
            <div>
                <Checkbox label={"asdsd"} checked={checked} onChecked={setChecked} />
            </div>
        </div>
    );
}
