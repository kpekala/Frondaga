import * as React from 'react';
import { useState } from 'react';
import "./TextInput.scss"

export interface TextInputProps {
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder: string;
}

export function TextInput(props: TextInputProps) {
    const [value, setValue] = useState("");

    const input = <input
        onChange={e => {
            setValue(e.target.value);
            if (props.onChange) props.onChange(value);
        }}
        onKeyDown={e => {
            if (e.key == "Enter" && props.onSubmit) props.onSubmit(value);
        }}
        className='TextInput'
        placeholder={props.placeholder}
    ></input>

    return ( input );
}