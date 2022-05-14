import * as React from 'react';
import { Button } from "./common/components";
import { MenuView } from "./views";

function clickMe() {
    console.log("Button is clicked");
}

export function App() {
    return (
        <div>
            <MenuView>dupa</MenuView>
        </div>
    );
}
