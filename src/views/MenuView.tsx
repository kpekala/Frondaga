import * as React from 'react';
import { MenuButton } from "./MenuButton";
import { View } from "./View";

import './MenuView.scss';

export interface MenuViewProps {
    // onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}

export function MenuView() {
    return (
        <View>
            <div className='MenuView'>
                <span className='logo'>szewc.<span className='letterI'>i</span><span className='letterO'>o</span></span>
                <div className='buttonContainer'>
                    <MenuButton onClick={() => null}> Graj sam </MenuButton>
                    <MenuButton onClick={() => null}> Graj z innymi </MenuButton>
                    <MenuButton onClick={() => null}> Opcje </MenuButton>
                </div>
            </div>
        </View>

    );
}