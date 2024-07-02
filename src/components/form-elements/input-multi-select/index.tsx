import css from './index.module.css';

type InputMultiSelectProps = {
    name: string;
    label: string;
    options: {
        name: string;
        value: string;
    }[];
};

export function MultiSelectInput(props: InputMultiSelectProps) {
    return (
        <div className={css.root}>
            <h3 className={css.label}>{props.label}</h3>
            <div className={css.options}>
                {props.options.map((option) => (
                    <div className={css.option} key={option.value}>
                        <input
                            className={css.checkbox}
                            type='checkbox'
                            name={props.name}
                            id={option.value}
                            value={option.value}
                        />
                        <label htmlFor={option.value}>{option.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
