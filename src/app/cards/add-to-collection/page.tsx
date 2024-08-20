'use client';

import { useEffect, useState } from 'react';

import { Table } from 'app/components/table';
import { Card, readCardCollection } from 'app/server/actions/database/cards';
import PageLayout from 'app/layouts/page';
import { Dialog } from 'app/components/dialog';
import { AddCollectionCardForm } from 'app/components/forms/add-collection-card';
import { CollectionCard, readCollectionCard } from 'app/server/actions/database/collection-cards';
import { sessionStore } from 'app/stores';

export default function Page() {
    const session = sessionStore;

    const [cards, setCards] = useState<Card[] | null>(null);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [collectionCard, setCollectionCard] = useState<CollectionCard | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        readCardCollection().then((cards) => setCards(cards));
    }, []);

    const fetchCollectionCard = async (id: string) => {
        const readCollectionCardResponse = await readCollectionCard(session.collection, id);

        if (!readCollectionCardResponse) {
            return;
        }

        setCollectionCard(readCollectionCardResponse);
        return readCollectionCardResponse;
    };

    const handleClick = async (id: string) => {
        if (cards === null) {
            return;
        }

        const card = cards.find((card) => card._id === id);

        if (card === undefined) {
            return;
        }

        setSelectedCard(card);

        await fetchCollectionCard(id);
        setShowDialog(true);
    };

    const onClose = () => {
        setShowDialog(false);
        setSelectedCard(null);
        setCollectionCard(null);
    };

    const dialogTitle = () => {
        if (!selectedCard) {
            return null;
        }

        return selectedCard.name + ' - ' + selectedCard.set;
    };

    return (
        <PageLayout title='Add to Collection'>
            <Table
                data={cards}
                columns={['name', 'manaCost', 'cardType', 'subTypes', 'set', 'rarity']}
                onClick={handleClick}
            />
            <Dialog title={dialogTitle()} visible={showDialog} onClose={onClose}>
                <AddCollectionCardForm card={selectedCard as Card} collectionCard={collectionCard} onClose={onClose} />
            </Dialog>
        </PageLayout>
    );
}
