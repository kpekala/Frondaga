import * as React from 'react';
import { useState } from 'react';
import { MenuView } from './views';
import { LoginView } from './views/LoginView';

enum View {
    LOGIN,
    MENU,
    GAME
}

export function App() {
    const [view, setView] = useState(View.LOGIN);

    switch (view) {
        case View.LOGIN:
            return (
            <div>
                <LoginView
                    onLogIn={() => setView(View.MENU)}
                ></LoginView>
            </div>);

<<<<<<< HEAD
        case View.MENU:
            return (
                <div>
                    <MenuView></MenuView>
                </div>);
        
        default:
            return (<></>);
    }
=======
            <BottomBar players={
                [
                    { name: "kacper", points: "1", color: "red" }, { name: "xxkacper", points: "2x1", color: "green" },
                    { name: "kacper", points: "1", color: "blue" }, { name: "xxkacper", points: "2x1", color: "yellow" },
                    { name: "kacper", points: "1", color: "blue" }, { name: "xxkacper", points: "2x1", color: "yellow" },
                    { name: "kacper", points: "1", color: "blue" }, { name: "xxkacper", points: "2x1", color: "yellow" }
                ]
            } />
        </div>
    );
>>>>>>> 8418b51 (feat: Make player scores wrap)
}
