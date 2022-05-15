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

        case View.MENU:
            return (
                <div>
                    <MenuView></MenuView>
                </div>);
        
        default:
            return (<></>);
    }
}
