import * as React from 'react';
import { InputContextProvider } from './inputContext/inputContext';
import { UserInputTestingView } from './views/UserInputTestingView';

function clickMe() {
    console.log("Button is clicked");
}

export function App() {
    return (
        <div>
            {/* <h1>Hello! Urodaga here</h1>
            <Button onClick={clickMe}>
                Click me!
            </Button> */}
            <InputContextProvider>
                <UserInputTestingView />
            </InputContextProvider>
        </div>
    );
}
