import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LOG_SERVER_PATH, NODE_ENV } from './config';
import { Logger } from './log';
import * as log from './log/middlewares';

import './styles/globals.scss';

// Setting up logs
(() => {
    if (NODE_ENV === 'production') {
        Logger.use(log.ignoreLevels(['debug']));
    }

    Logger.use(log.timestamp);

    if (LOG_SERVER_PATH) {
        Logger.use(log.toPostEndpoint(LOG_SERVER_PATH));
        // Stats.use(log.toPostEndpoint(LOG_SERVER_PATH));
    }
    
    Logger.use(log.toConsole(l => `(${new Date(l.metadata.timestamp as number)}) [${l.level.toUpperCase()}] ${l.msg}`));
    // Stats.use(log.toConsole(log.stringifyStats));
})();

const container = document.getElementById('app');
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
container!);
