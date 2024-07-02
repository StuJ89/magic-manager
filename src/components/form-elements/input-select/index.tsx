import css from './index.module.css';

type SelectInputProps = {
    name: string;
    label: string;
    options: {
        name: string;
        value: string;
    }[];
};

export function SelectInput(props: SelectInputProps) {
    return (
        <div className={css.root}>
            <label className={css.label} htmlFor={props.name}>
                {props.label}
            </label>
            <select name={props.name} id={props.name}>
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
