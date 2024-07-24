import { ChangeEvent, useState } from 'react';

import css from './index.module.css';

type NumberInputProps = {
    name: string;
    label: string;
    value: number;
};

export function NumberInput(props: NumberInputProps) {
    const [value, setValue] = useState(props.value);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.valueAsNumber;

        if (event.target.value === '' || input < 0) {
            return;
        }

        setValue(event.target.valueAsNumber);
    };

    return (
        <div className={css.root}>
            <label className={css.label} htmlFor={props.name}>
                {props.label}
            </label>
            <input
                className={css.input}
                type='number'
                name={props.name}
                id={props.name}
                value={value}
                onChange={handleChange}
                autoComplete='off'
            />
        </div>
    );
}
