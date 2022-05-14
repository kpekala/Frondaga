import * as React from 'react';

interface ButtonProps {
    onClick: (event: React.MouseEvent) => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button onClick={props.onClick}>
            Click me!
        </button>
    );
}