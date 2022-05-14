import './UserInputTestingView.scss';

import * as React from 'react';
import { UserLineInput } from '../userLineInput/UserLineInput';


export function UserInputTestingView() {
    return (
        <div className='UserInputTestingView'>
            <div className='UserInputTestingView__grid'>
                <UserLineInput position={{ col: 0, row: 0 }} />
            </div>
        </div>
    );
}
