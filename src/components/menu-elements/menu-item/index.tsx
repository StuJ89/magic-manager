'use client';

import { useRouter } from 'next/navigation';

import { ColouredCard } from 'app/components/cards/coloured-card';

export type MenuItem = {
    name: string;
    link: string;
    icon?: string;
    type?: string;
};

export function MenuItem(props: MenuItem) {
    const router = useRouter();

    const handleClick = () => {
        router.push(props.link);
    };

    return <ColouredCard title={props.name} type={props.type ?? 'standard'} icon={props.icon} onClick={handleClick} />;
}
