'use server';

import { getDatabaseCollection } from 'app/server/database';
import { ObjectId, WithoutId } from 'mongodb';
import { CollectionCard } from './collection-cards';

export type DeckCard = {
    readonly _id: string | ObjectId;
    readonly deck: string;
    readonly card: string;
    readonly quantity: number;
};

export type DeckCollectionCard = WithoutId<CollectionCard> & DeckCard;

export async function readDeckCards(deckId: string): Promise<DeckCard[]> {
    const deckCardCollection = await getDatabaseCollection<DeckCard>('deck-cards');
    const deckCards = await deckCardCollection.find({ deck: deckId }).toArray();

    const documents: DeckCollectionCard[] = [];

    deckCards.forEach((card) => {});

    return documents;
}
