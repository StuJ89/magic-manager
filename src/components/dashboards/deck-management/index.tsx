import { ReactElement, useEffect, useState } from 'react';

import { Deck } from 'app/server/actions/database/decks';
import { DeckCardCategory, DeckCards, readDeckCards } from 'app/server/actions/database/deck-cards';
import { DeckCategory } from './components/deck-category';

import css from './index.module.css';

type DeckManagementProps = {
    deck: Deck;
};

export function DeckManagement(props: DeckManagementProps) {
    const [deckCards, setDeckCards] = useState<DeckCards>([]);

    useEffect(() => {
        readDeckCards(props.deck._id as string).then((response) => {
            setDeckCards(response);
        });
    }, [props.deck._id]);

    const renderDeckCategories = (): ReactElement | null => {
        if (deckCards.length === 0) {
            return null;
        }

        const categories = deckCards.filter((category) => {
            return category.cards.length > 0;
        });

        if (categories.length === 0) {
            return null;
        }

        return (
            <div>
                {categories.map((category: DeckCardCategory) => {
                    return (
                        <div key={category.type}>
                            <DeckCategory name={category.name} cards={category.cards} />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={css.root}>
            <div className={css.header}>
                <p className={css.title}>{props.deck.name}</p>
            </div>
            {renderDeckCategories()}
        </div>
    );
}
