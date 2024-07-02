'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

import css from './index.module.css';
import { useRouter } from 'next/navigation';
import { BackArrowIcon } from 'app/icons/back-arrow';
import { HomeIcon } from 'app/icons/home';

type PageLayoutProps = {
    title: string;
    children: ReactNode;
};

export default function PageLayout(props: PageLayoutProps) {
    const router = useRouter();

    return (
        <div className={css.root}>
            <div className={css.header}>
                <div className={css.backButton} onClick={() => router.back()}>
                    <BackArrowIcon />
                </div>
                <h1 className={css.title}>{props.title}</h1>
                <Link className={css.homeButton} href='/'>
                    <HomeIcon />
                </Link>
            </div>
            {props.children}
        </div>
    );
}
