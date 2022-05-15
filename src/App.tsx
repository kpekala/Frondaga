import * as React from 'react';

import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { QuizTestView } from './layout/QuizTestView';
import { GameView, MenuView } from './views';
import { LoginView } from './views/LoginView';

enum View {
    LOGIN,
    MENU,
    GAME
}

export function App() {
    const [view, setView] = useState(View.LOGIN);

    const viewMakers = {
        [View.LOGIN]: () => (
            <LoginView
                onLogIn={() => setView(View.MENU)}
            ></LoginView>
        ),
        [View.MENU]: () => (
            <MenuView></MenuView>
        ),
        [View.GAME]: () => (
            <GameView />
        ),
    };

    return (
        <Routes>
            <Route path="/" element={viewMakers[view]()} />
            <Route path="/menu-test" element={<MenuView />} />
            <Route path="/game-test" element={<GameView />} />
            <Route path="/quiz-test" element={<QuizTestView />} />
        </Routes>
    );
}
