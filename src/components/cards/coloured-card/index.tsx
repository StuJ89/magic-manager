import { MouseEvent, ReactNode } from 'react';

import { AddIcon } from 'app/icons/add';
import { CardsIcon } from 'app/icons/cards';
import { DecksIcon } from 'app/icons/decks';

import css from './index.module.css';
import { ViewIcon } from 'app/icons/view';

export type ColouredCardProps = {
    readonly title: string;
    readonly type: string;
    readonly icon?: string;
    readonly description?: string;
    readonly onClick?: () => void;
};

export function ColouredCard(props: ColouredCardProps): ReactNode {
    const renderIcon = () => {
        switch (props.icon) {
            case 'cards':
                return <CardsIcon />;
            case 'decks':
                return <DecksIcon />;
            case 'add':
                return <AddIcon />;
            case 'view':
                return <ViewIcon />;
            default:
                return <AddIcon />;
        }
    };

    const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();

        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <div className={css.root} onClick={handleClick}>
            <div className={`${css.header} ${css[props.type]}`}>{renderIcon()}</div>
            <div className={css.body}>
                <p className={css.title}>{props.title}</p>
            </div>
        </div>
    );
}
