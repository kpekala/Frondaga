import './GeneralPopUp.scss';

import * as React from 'react';
import { WrapperProps } from '../commonProps';
import classNames from 'classnames';


export interface GeneralPopUpProps extends WrapperProps {
    innerClassName?: string;
    blockBackground?: boolean;
}

export function GeneralPopUp(props: GeneralPopUpProps) {
    return (
        <div className={classNames('GeneralPopUp', props.className)}>
            {props.blockBackground && <div className={'GeneralPopUp__screen'} />}
            <div className={classNames('GeneralPopUp__inner', props.innerClassName)} style={props.style}>
                {props.children}
            </div>
        </div>
    );
}
