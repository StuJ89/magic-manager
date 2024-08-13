'use server';

import { getDatabaseCollection } from 'app/server/database';
import { ObjectId, WithoutId } from 'mongodb';

export type Card = {
    _id: string | ObjectId;
    name: string;
    colours: string[];
    manaCost: string;
    convertedManaCost: number;
    cardType: string[];
    subTypes: string[];
    set: string;
    rarity: string;
    rulesText: string;
    keywords: string[];
    power: number | null;
    toughness: number | null;
    image: string | null;
    price: {
        standard: number | null;
        foil: number | null;
        lastUpdated: Date;
    };
};

export async function createCard(data: WithoutId<Card>): Promise<{ success: boolean }> {
    const collection = await getDatabaseCollection<Card>('cards');
    const document = await collection.insertOne(data as Card);
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

export async function readCard(id: string): Promise<Card | null> {
    const collection = await getDatabaseCollection<Card>('cards');
    const document = await collection.findOne({ _id: new ObjectId(id) });

    return document;
}

export async function readCardCollection(): Promise<Card[]> {
    const collection = await getDatabaseCollection<Card>('cards');
    const documents = await collection.find().sort({ name: 'asc' }).toArray();

    documents.forEach((document) => {
        document._id = document._id.toString();
    });

    return documents;
}

export async function updateCard(id: string, data: Card): Promise<Card | null> {
    const collection = await getDatabaseCollection<Card>('cards');

    await collection.updateOne({ _id: new ObjectId(id) }, data);

    const result = await collection.findOne({ _id: new ObjectId(id) });

    return result;
}

export async function deleteCard(id: string): Promise<boolean> {
    const collection = await getDatabaseCollection<Card>('cards');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0;
}
