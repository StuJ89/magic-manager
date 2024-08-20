'use client';

import { useEffect, useState } from 'react';

import PageLayout from 'app/layouts/page';

import { CollectionCard, readCollectionCards } from 'app/server/actions/database/collection-cards';
import { Table } from 'app/components/table';

import { sessionStore } from 'app/stores';
import { Dialog } from 'app/components/dialog';
import { AddCardToDeckForm } from 'app/components/forms/add-card-to-deck';
import { DeckCard, readDeckCard } from 'app/server/actions/database/deck-cards';

type AddCardToDeckProps = {
    readonly params: {
        readonly deck: string;
    };
};

export default function Page(props: AddCardToDeckProps) {
    const [cards, setCards] = useState<CollectionCard[] | null>(null);
    const [selectedCard, setSelectedCard] = useState<CollectionCard | null>(null);
    const [deckCard, setDeckCard] = useState<DeckCard | null>(null);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const store = sessionStore;

    useEffect(() => {
        readCollectionCards(store.collection).then((cards) => setCards(cards));
    }, [store.collection]);

    const fetchDeckCard = async (collectionCardId: string) => {
        const readDeckCardResponse = await readDeckCard(props.params.deck, collectionCardId);

        if (!readDeckCardResponse) {
            return null;
        }

        setDeckCard(readDeckCardResponse);
    };

    const handleClick = async (collectionCardId: string) => {
        if (cards === null) {
            return;
        }

        const card = cards.find((card) => card._id === collectionCardId);

        if (card === undefined) {
            return;
        }

        await fetchDeckCard(collectionCardId);
        setSelectedCard(card);
        setShowDialog(true);
    };

    const handleClose = () => {
        setShowDialog(false);
        setSelectedCard(null);
        setDeckCard(null);
    };

    return (
        <PageLayout title='Add Cards to Deck'>
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
                    'inDecks'
                ]}
                onClick={handleClick}
            />
            <Dialog title='Add to Deck' visible={showDialog} onClose={handleClose}>
                <AddCardToDeckForm collectionCard={selectedCard} deckCard={deckCard} deckId={props.params.deck}/>
            </Dialog>
        </PageLayout>
    );
}
