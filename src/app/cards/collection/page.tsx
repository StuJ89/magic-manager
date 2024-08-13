'use client';

import { useEffect, useState } from 'react';

import PageLayout from 'app/layouts/page';
import { CollectionCard, readCollectionCards } from 'app/server/actions/database/collection-cards';
import { Table } from 'app/components/table';
import { sessionStore } from 'app/stores';

export default function Page() {
    const [cards, setCards] = useState<CollectionCard[] | null>(null);
    const store = sessionStore;

    useEffect(() => {
        readCollectionCards(store.collection).then((cards) => setCards(cards));
    }, [store.collection]);

    return (
        <PageLayout title='View Collection'>
            <Table
                data={cards}
                columns={[
                    'name',
                    'manaCost',
                    'cardType',
                    'subTypes',
                    'set',
                    'rarity',
                    'keywords',
                    'quantity',
                    'inDecks',
                    'value'
                ]}
            />
        </PageLayout>
    );
}
