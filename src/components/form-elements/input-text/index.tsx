import css from './index.module.css';

type TextInputProps = {
    name: string;
    label: string;
    placeholder?: string;
};

export function TextInput(props: TextInputProps) {
    return (
        <div className={css.root}>
            <label className={css.label} htmlFor={props.name}>
                {props.label}
            </label>
            <input
                className={css.input}
                type='text'
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                autoComplete='off'
            />
        </div>
    );
}
