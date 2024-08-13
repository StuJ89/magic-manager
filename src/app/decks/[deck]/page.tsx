'use client';

import { useEffect, useState } from 'react';

import { Deck, readDeck } from 'app/server/actions/database/decks';

import PageLayout from 'app/layouts/page';
import { DeckManagement } from 'app/components/dashboards/deck-management';

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

    const renderPageContent = () => {
        if (!deck) {
            return <p>Loading...</p>;
        }

        return <DeckManagement deck={deck} />
    };

    return <PageLayout title={"Deck Management"}>{renderPageContent()}</PageLayout>;
}
