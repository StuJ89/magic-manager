import { ReactNode, useEffect, useState } from 'react';

import { CloseIcon } from 'app/icons/close';

import css from './index.module.css';

type DialogProps = {
    children: ReactNode;
    title: string | null;
    visible: boolean;
    onClose: () => void;
};

export function Dialog(props: DialogProps): ReactNode {
    if (!props.visible) {
        return null;
    }

    return (
        <div className={css.root}>
            <div className={css.dialog}>
                <div className={css.header}>
                    <p className={css.title}>{props.title}</p>
                    <div className={css.icon} onClick={() => props.onClose()}>
                        <CloseIcon />
                    </div>
                </div>
                <div className={css.childContainer}>{props.children}</div>
            </div>
        </div>
    );
}
