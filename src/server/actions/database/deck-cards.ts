'use server';

import { ObjectId, WithoutId } from 'mongodb';
import { getDatabaseCollection } from 'app/server/database';
import { CollectionCard, updateCollectionCard } from './collection-cards';
export type DeckCard = {
    _id: string | ObjectId;
    readonly deck: string;
    readonly card: CollectionCard;
    readonly deckCardQuantity: DeckCardQuantity;
};

export type DeckCardCategory = {
    name: string;
    type: string;
    cards: DeckCard[];
};

export type DeckCards = DeckCardCategory[];

export type DeckCardQuantity = {
    standard: number,
    foil: number,
    total: number
}

export async function createDeckCard(deckId: string, collectionCard: CollectionCard, quantity: DeckCardQuantity): Promise<{ success: boolean }> {
    const collection = await getDatabaseCollection<DeckCard>('deck-cards');
    const document: WithoutId<DeckCard> = {
        deck: deckId,
        card: collectionCard,
        deckCardQuantity: quantity
    }

    await collection.insertOne(document as DeckCard);

    const updatedCollectionCard = { ...collectionCard } as WithoutId<CollectionCard> & { _id?: string };
    delete updatedCollectionCard._id;

    updatedCollectionCard.quantity.standardInDecks += quantity.standard;
    updatedCollectionCard.quantity.foilInDecks += quantity.foil;
    updatedCollectionCard.quantity.totalInDecks += quantity.total;

    updateCollectionCard(collectionCard._id as string, updatedCollectionCard);

    return {
        success: true
    };
}

export async function readDeckCard(deckId: string, collectionCardId: string): Promise<DeckCard | null> {
    const collection = await getDatabaseCollection<DeckCard>('deck-cards');
    const document = await collection.findOne({ 'deck': deckId, 'card._id': collectionCardId });

    if (!document) {
        return null;
    }

    document._id = document._id.toString();
    document.card._id = document.card._id.toString();

    return document;
}

export async function readDeckCards(deckId: string): Promise<DeckCards> {
    const collection = await getDatabaseCollection<DeckCard>('deck-cards');
    const documents = await collection.find({ deck: deckId }).toArray();

    const deckCards: DeckCards = [
        {
            name: 'Planeswalkers',
            type: 'planeswalker',
            cards: []
        },
        {
            name: 'Creatures',
            type: 'creature',
            cards: []
        },
        {
            name: 'Artifacts',
            type: 'artifact',
            cards: []
        },
        {
            name: 'Enchantments',
            type: 'enchantment',
            cards: []
        },
        {
            name: 'Battles',
            type: 'battle',
            cards: []
        },
        {
            name: 'Instants',
            type: 'instant',
            cards: []
        },
        {
            name: 'Sorceries',
            type: 'sorcery',
            cards: []
        },
        {
            name: 'Lands',
            type: 'land',
            cards: []
        }
    ];

    documents.forEach((document: DeckCard) => {
        document._id = document._id.toString();
        document.card._id = document.card._id.toString();

        const cardTypes: string[] = document.card.cardType;

        deckCards.forEach((category) => {
            if (cardTypes.includes(category.type)) {
                category.cards.push(document);
            }
        });
    });

    return deckCards;
}
