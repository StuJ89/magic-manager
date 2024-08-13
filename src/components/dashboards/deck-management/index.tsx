import { useEffect, useState } from 'react';

import { Deck } from 'app/server/actions/database/decks';
import { DeckCard, readDeckCards } from 'app/server/actions/database/deck-cards';

import { Table } from 'app/components/table';

import css from './index.module.css';
import { CollectionCard, readCollectionCard } from 'app/server/actions/database/collection-cards';
import { sessionStore } from 'app/stores';

type DeckManagementProps = {
    deck: Deck;
};

export function DeckManagement(props: DeckManagementProps) {
    const [deckCards, setDeckCards] = useState<DeckCard[]>([]);

    useEffect(() => {
        readDeckCards(props.deck._id as string).then((response) => {
            setDeckCards(response);
        });
    }, [props.deck._id]);

    console.log(deckCards);

    return (
        <div className={css.root}>
            <div className={css.header}>
                <p className={css.title}>{props.deck.name}</p>
            </div>
            <Table data={deckCards} columns={[]} />
        </div>
    );
}
