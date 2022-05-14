import * as React from 'react';

export interface CheckboxProps {
  id: string;
  label: string;
}

export function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = React.useState(true);

  return (
    <label htmlFor={props.id}>
      <input type="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
      {props.label}
    </label>
  );
}