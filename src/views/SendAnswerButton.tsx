import './SendAnswerButton.scss';

import * as React from 'react';
import classNames from 'classnames';
import { MenuButtonProps } from './MenuButton';


export function SendAnswerButton(props: MenuButtonProps & { disabled?: boolean }) {
    return (
        <button className={classNames('SendAnswerButton', {
            'SendAnswerButton--disabled': props.disabled,
        })} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
}
