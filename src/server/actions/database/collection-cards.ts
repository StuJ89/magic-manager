'use server';

import { getDatabaseCollection } from 'app/server/database';
import { ObjectId, WithoutId } from 'mongodb';
import { Card } from './cards';

export type CollectionCard = WithoutId<Card> & {
    _id: string | ObjectId;
    collection: string;
    cardId: string;
    quantity: {
        standard: number;
        foil: number;
    };
};

export async function createCollectionCard(data: WithoutId<CollectionCard>): Promise<{ success: boolean }> {
    const collection = await getDatabaseCollection<CollectionCard>('collection-cards');
    const document = await collection.insertOne(data as CollectionCard);
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

export async function readCollectionCard(collectionId: string, cardId: string): Promise<CollectionCard | null> {
    console.log(collectionId, cardId);
    const collection = await getDatabaseCollection<CollectionCard>('collection-cards');
    const document = await collection.findOne({
        collection: collectionId,
        cardId: cardId
    });

    if (!document) {
        return null;
    }

    document._id = document._id.toString();

    return document;
}

export async function updateCollectionCard(
    collectionCardId: string,
    data: WithoutId<CollectionCard>
): Promise<{ success: boolean }> {
    const collection = await getDatabaseCollection<CollectionCard>('collection-cards');
    const document = await collection.updateOne(
        {
            _id: new ObjectId(collectionCardId)
        },
        {
            $set: data
        }
    );

    if (document.modifiedCount === 0) {
        return {
            success: false
        };
    }

    return {
        success: true
    };
}

export async function readCollectionCards(id: string): Promise<CollectionCard[]> {
    const collection = await getDatabaseCollection<CollectionCard>('collection-cards');
    const documents = await collection.find({ collection: id }).sort({ name: 'asc' }).toArray();

    documents.forEach((document) => {
        document._id = document._id.toString();
    });

    return documents;
}
