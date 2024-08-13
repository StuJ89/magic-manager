import { useEffect, useState } from 'react';

import { AddIcon } from 'app/icons/add';
import { Deck } from 'app/server/actions/database/decks';
import { DeckCard, readDeckCards } from 'app/server/actions/database/deck-cards';

import css from './index.module.css';
import { Table } from 'app/components/table';

type DeckManagementProps = {
    deck: Deck;
};

export function DeckManagement(props: DeckManagementProps) {
    const [cards, setCards] = useState<DeckCard[]>([]);

    useEffect(() => {
        readDeckCards(props.deck._id as string).then((deckCards) => {
            setCards(deckCards);
        });
    }, [props.deck._id]);

    return (
        <div className={css.root}>
            <div className={css.header}>
                <p className={css.title}>{props.deck.name}</p>
            </div>
            <Table data={cards} columns={[]} />
        </div>
    );
}
