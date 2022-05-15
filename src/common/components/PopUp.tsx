import './PopUp.scss';

import * as React from 'react';
import { WrapperProps } from '../commonProps';
import classNames from 'classnames';


export function PopUp(props: WrapperProps) {
    return (
        <div className={classNames('PopUp', props.className)}>
            {props.children}
        </div>
    );
}