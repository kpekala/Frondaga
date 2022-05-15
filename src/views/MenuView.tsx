import * as React from 'react';
import { useState } from 'react';
import { MenuButton } from "./MenuButton";
import { View } from "./View";

import './MenuView.scss';
import { PlayPopUp } from './PlayPopUp';

export interface MenuViewProps {
    children: React.ReactNode;
}

export function MenuView() {
    const [content, setContent] = useState(<></>);

    const localPopUp = <PlayPopUp 
        onClose={() => setContent(<></>)}
        onCreateNew={() => alert("dupa") }
        onJoin={(token) => alert(token)}
    ></PlayPopUp>;

    const netPopUp = <PlayPopUp 
        onClose={() => setContent(<></>)}
        onCreateNew={() => alert("dupa")}
        onJoin={(token) => alert(token)}
    ></PlayPopUp>;
    const optionsPopUp = <></>;

    return (
        <View>
            <div className='MenuView'>
                <span className='logo'>szewc.<span className='letterI'>i</span><span className='letterO'>o</span></span>
                <div className='buttonContainer'>
                    <MenuButton onClick={() => setContent(localPopUp)}> Graj lokalnie </MenuButton>
                    <MenuButton onClick={() => setContent(netPopUp)}> Graj przez sieć </MenuButton>
                    <MenuButton onClick={() => setContent(optionsPopUp)}> Opcje </MenuButton>
                </div>
            </div>
            {content}
        </View>

    );
}