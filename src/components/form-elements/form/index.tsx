'use client';

import { FormEvent, ReactNode } from 'react';

import css from './index.module.css';

type FormProps = {
    children: ReactNode;
    buttonLabel?: string;
    fixedWidth?: boolean;
    submitAction: (formData: FormData) => void;
};

export function Form(props: FormProps) {
    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        props.submitAction(new FormData(event.target as HTMLFormElement));
    };

    const determineFormClassName = () => {
        if (props.fixedWidth === true) {
            return `${css.root} ${css.formFixedWidth}`;
        }

        return css.root;
    };

    return (
        <form className={determineFormClassName()} onSubmit={handleSubmit}>
            {props.children}
            <div className={css.footer}>
                <button className={css.button} type='submit'>
                    {props.buttonLabel ?? 'Submit'}
                </button>
            </div>
        </form>
    );
}
