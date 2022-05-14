import * as React from 'react';
import { Button } from "./common/components";

function clickMe() {
    console.log("Button is clicked");
}

export function App() {
    return (
        <div>
            <h1>Hello! Urodaga here</h1>
            <Button onClick={clickMe}>
                Click me!
            </Button>
        </div>
    );
}
