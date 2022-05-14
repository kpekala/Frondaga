import * as React from 'react';

export interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChecked?: (checked: boolean) => void;
}

export function Checkbox(props: CheckboxProps) {
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChecked)
            props.onChecked(e.target.checked);
    };

    return (
        <label>
            <input type="checkbox"
                checked={props.checked || false}
                onChange={handleChecked}
            />
            {props.label}
        </label>
    );
}
