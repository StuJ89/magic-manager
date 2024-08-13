'use server';

import { ObjectId, WithoutId } from 'mongodb';
import { getDatabaseCollection } from 'app/server/database';
import { CollectionCard } from './collection-cards';

export type DeckCard = {
    readonly _id: string | ObjectId;
    readonly deck: string;
    readonly card: CollectionCard;
    readonly deckCardQuantity: {
        standard: number;
        foil: number;
        total: number;
    };
};

export async function readDeckCards(deckId: string): Promise<DeckCard[]> {
    const collection = await getDatabaseCollection<DeckCard>('deck-cards');
    const documents = await collection.find({ deck: deckId }).toArray();

    documents.forEach((document) => {
        document._id = document._id.toString();
        document.card._id = document.card._id.toString();
    });

    return documents;
}
