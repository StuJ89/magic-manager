'use server';

import { getDatabaseCollection } from 'app/server/database';
import { WithId, WithoutId } from 'mongodb';

export type Deck = {
    _id: string;
    name: string;
    colours: string[];
    keywords: string[];
};

export async function createDeck(data: WithoutId<Deck>): Promise<{ success: boolean }> {
    const collection = await getDatabaseCollection<Deck>('decks');
    const document = await collection.insertOne(data as Deck);

    const result = await collection.findOne({
        _id: document.insertedId
    });

    if (!result) {
        return {
            success: false
        };
    }

    return {
        success: true
    };
}

export async function readDecksCollection(): Promise<Deck[]> {
    const collection = await getDatabaseCollection<Deck>('decks');
    const documents = await collection.find().sort({ name: 'asc' }).toArray();

    documents.forEach((document) => {
        document._id = document._id.toString();
    });

    return documents;
}
