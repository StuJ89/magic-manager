import { MenuItem } from 'app/components/menu-elements/menu-item';

import css from './index.module.css';

type MenuProps = {
    readonly options: MenuItem[];
};

export function Menu(props: MenuProps) {
    return (
        <div className={css.root}>
            {props.options.map((option) => (
                <MenuItem
                    key={option.name}
                    name={option.name}
                    link={option.link}
                    icon={option.icon}
                    type={option.type}
                />
            ))}
        </div>
    );
}
