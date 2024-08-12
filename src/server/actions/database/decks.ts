'use server';

import { getDatabaseCollection } from 'app/server/database';
import { ObjectId, WithoutId } from 'mongodb';

export type Deck = {
    _id: string | ObjectId;
    name: string;
    colours: string[];
    keywords: string[];
    record: {
        wins: number;
        losses: number;
    };
    active: boolean;
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

export async function readDeck(id: string): Promise<Deck | null> {
    const collection = await getDatabaseCollection<Deck>('decks');
    const document = await collection.findOne({ _id: new ObjectId(id) });

    if (!document) {
        return null;
    }

    document._id = document._id.toString();

    return document;
}

export async function readActiveDecks(): Promise<Deck[]> {
    const collection = await getDatabaseCollection<Deck>('decks');
    const documents = await collection.find({ active: true }).sort({ name: 'asc' }).toArray();

    documents.forEach((document) => {
        document._id = document._id.toString();
    });

    return documents;
}
