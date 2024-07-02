'use server';

import { getDatabaseCollection } from 'app/server/database';
import { ObjectId } from 'mongodb';

export type Card = {
    name: string;
    colours: string[];
    manaCost: string[];
    convertedManaCost: number;
    cardType: string[];
    subTypes: string[];
    set: string;
    rarity: string;
    rulesText: string;
    keyWords: string[];
    power: number | null;
    toughness: number | null;
    image: string | null;
};

export async function createCard(data: Card): Promise<Card | null> {
    const collection = await getDatabaseCollection<Card>('cards');
    const document = await collection.insertOne(data);
    const result = await collection.findOne({
        _id: document.insertedId
    });

    return result;
}

export async function readCard(id: string): Promise<Card | null> {
    const collection = await getDatabaseCollection<Card>('cards');
    const document = await collection.findOne(new ObjectId(id));

    return document;
}

export async function readCardCollection(): Promise<Card[]> {
    const collection = await getDatabaseCollection<Card>('cards');
    const documents = await collection.find().toArray();

    return documents;
}

export async function updateCard(id: string, data: Card): Promise<Card | null> {
    const collection = await getDatabaseCollection<Card>('cards');

    await collection.updateOne(new ObjectId(id), data);

    const result = await collection.findOne(new ObjectId(id));

    return result;
}

export async function deleteCard(id: string): Promise<boolean> {
    const collection = await getDatabaseCollection<Card>('cards');
    const result = await collection.deleteOne(new ObjectId(id));

    return result.deletedCount > 0;
}
