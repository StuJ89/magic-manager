'use client';

import { Table } from 'app/components/table';
import PageLayout from 'app/layouts/page';
import { Deck, readDecksCollection } from 'app/server/actions/database/decks';
import { useEffect, useState } from 'react';

export default function Page() {
    const [decks, setDecks] = useState<Deck[] | null>(null);

    useEffect(() => {
        readDecksCollection().then((decks) => setDecks(decks));
    }, []);

    return (
        <PageLayout title='My Decks'>
            <Table data={decks} columns={['name', 'colours', 'keywords']}></Table>
        </PageLayout>
    );
}
