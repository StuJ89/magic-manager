'use server';

import { ObjectId, WithoutId } from 'mongodb';
import { getDatabaseCollection } from 'app/server/database';
import { CollectionCard } from './collection-cards';

export type DeckCard = {
    _id: string | ObjectId;
    readonly deck: string;
    readonly card: CollectionCard;
    readonly deckCardQuantity: {
        standard: number;
        foil: number;
        total: number;
    };
};

export type DeckCardCategory = {
    name: string;
    type: string;
    cards: DeckCard[];
};

export type DeckCards = DeckCardCategory[];

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
