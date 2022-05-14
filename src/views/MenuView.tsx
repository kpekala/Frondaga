import * as React from 'react';
import { Button } from "../common/components";
import { View } from "./View";

import './MenuView.scss';

export interface MenuViewProps {
    // onClick: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}

export function MenuView(props: MenuViewProps) {
    return (
        <View>
            <div className='MenuView'>
                <span className='logo'>szewc.<span className='letterI'>i</span><span className='letterO'>o</span></span>
                <div className='buttonContainer'>
                    <Button onClick={() => null}> Graj sam </Button>
                    <Button onClick={() => null}> Graj z innymi </Button>
                    <Button onClick={() => null}> Opcje </Button>
                </div>
            </div>
        </View>

    );
}