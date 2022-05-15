import * as React from 'react';
import "./LoginInput.scss"

export interface LoginInputProps {
    onchange: (nickname: string) => void;
    placeholder: string;
}

export function LoginInput(props: LoginInputProps) {
    return (
        <input onChange={e => props.onchange(e.target.value)} className='LoginInput' placeholder={props.placeholder}></input>
    );
}