import * as React from 'react';
import { LoginButton } from "./LoginButton";
import { TextInput } from './TextInput';
import { View } from "./View";
import { LogInService } from "../services/logInService";

import './LoginView.scss';

export interface LoginViewProps {
    // children: React.ReactNode;
    onLogIn: () => void;
}

export function LoginView(props: LoginViewProps) {

    function validateNickName(nickname: string) {
        LogInService.setUsername(nickname);
    }

    return (
        <View>
            <div className='LoginView'>
                <span className='logo'>szewc.<span className='letterI'>i</span><span className='letterO'>o</span></span>
                <TextInput
                    onChange={validateNickName}
                    placeholder='Wpisz swój nick...'
                ></TextInput>
                <div className='buttonContainer'>
                    <LoginButton onClick={e => props.onLogIn()}> Wejdź </LoginButton>
                </div>
            </div>
        </View>

    );
}