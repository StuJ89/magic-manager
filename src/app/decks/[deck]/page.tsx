'use client';

import { useEffect, useState } from 'react';

import { Deck, readDeck } from 'app/server/actions/database/decks';

import PageLayout from 'app/layouts/page';

export type DeckProps = {
    readonly params: {
        readonly deck?: string;
    };
};

export default function Page(props: DeckProps) {
    const [deck, setDeck] = useState<Deck | null>(null);

    useEffect(() => {
        if (!props.params.deck) {
            return;
        }

        readDeck(props.params.deck).then((deck) => setDeck(deck));
    }, [props.params.deck]);

    const renderPageTitle = () => {
        if (!deck) {
            return '';
        }

        return deck.name;
    };

    const renderPageContent = () => {
        if (!deck) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <h1>{deck.name}</h1>
                <p>Colours: {deck.colours.join(', ')}</p>
                <p>Keywords: {deck.keywords.join(', ')}</p>
            </div>
        );
    };

    return <PageLayout title={renderPageTitle()}>{renderPageContent()}</PageLayout>;
}
