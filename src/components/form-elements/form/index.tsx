'use client';

import { FormEvent, ReactNode } from 'react';

import css from './index.module.css';

type FormProps = {
    children: ReactNode;
    submitAction: (formData: FormData) => void;
    buttonLabel?: string;
};

export function Form(props: FormProps) {
    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        props.submitAction(new FormData(event.target as HTMLFormElement));
    };

    return (
        <form className={css.root} onSubmit={handleSubmit}>
            {props.children}
            <div className={css.footer}>
                <button className={css.button} type='submit'>
                    {props.buttonLabel ?? 'Submit'}
                </button>
            </div>
        </form>
    );
}
