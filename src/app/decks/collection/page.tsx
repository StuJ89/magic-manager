'use client';

import { useEffect, useState } from 'react';

import { Table } from 'app/components/table';
import { Deck, readDecksCollection } from 'app/server/actions/database/decks';
import PageLayout from 'app/layouts/page';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [decks, setDecks] = useState<Deck[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        readDecksCollection().then((decks) => setDecks(decks));
    }, []);

    const handleClick = (id: string) => {
        router.push(`/decks/${id}`);
    };

    return (
        <PageLayout title='My Decks'>
            <Table data={decks} columns={['name', 'colours', 'keywords']} onClick={handleClick} />
        </PageLayout>
    );
}
