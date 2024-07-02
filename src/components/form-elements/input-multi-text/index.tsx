import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { AddIcon } from 'app/icons/add';

import css from './index.module.css';

type InputMultiTextProps = {
    name: string;
    label: string;
    placeholder?: string;
};

export function MultiTextInput(props: InputMultiTextProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [values, setValues] = useState<string[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddValue = useCallback(() => {
        if (values.includes(inputValue) || inputValue === '') {
            return;
        }

        setValues([...values, inputValue.trim()]);
        setInputValue('');
    }, [inputValue, values]);

    useEffect(() => {
        const enterKeypress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleAddValue();
            }
        };

        document.addEventListener('keydown', enterKeypress);
        return () => document.removeEventListener('keydown', enterKeypress);
    }, [handleAddValue, values]);

    return (
        <div className={css.root}>
            <label className={css.label} htmlFor={'multi-text-input'}>
                {props.label}
            </label>
            <div className={css.inputContainer}>
                <input
                    className={css.input}
                    type='text'
                    name={'multi-text-input'}
                    id={'multi-text-input'}
                    placeholder={props.placeholder}
                    value={inputValue}
                    autoComplete='off'
                    onChange={handleChange}
                />
                <button className={css.button} onClick={handleAddValue} type='button'>
                    <AddIcon />
                </button>
            </div>
            <input type='hidden' name={props.name} id={props.name} value={values.join(',')} />
            <div className={css.valueContainer}>
                {values.map((value) => (
                    <div className={css.value} key={value}>
                        {value}
                    </div>
                ))}
            </div>
        </div>
    );
}
