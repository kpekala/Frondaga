import * as React from 'react';
import { MenuButton } from './MenuButton';
import { TextInput } from './TextInput';
import { PopUp } from '../common/components/PopUp';
import './PlayPopUp.scss';

export interface PlayPopUpProps {
    onClose?: () => void;
    onCreateNew: () => void;
    onJoin: (token: string) => void;
}

export function PlayPopUp(props: PlayPopUpProps) {
    return (
        <div className='PlayPopUp'>
            <div className='PlayPopUp__inner'>
                <div
                    className='escapeButton'
                    onClick={e => { if (props.onClose) props.onClose(); }}
                ></div>
                <span>Chcesz stworzyć nowy pokój, czy dołączyć do istniejącego?</span>
                <div className='buttonContainer'>
                    <MenuButton onClick={() => props.onCreateNew()}>Nowy</MenuButton>
                    <TextInput
                        placeholder='Dołącz...'
                        onSubmit={(token) => props.onJoin(token)}
                    ></TextInput>
                </div>
            </div>
        </div>
    );
}