```ts
type User = {
    name: string;
    email: string;
    password: string;
};

type Card = {
    name: string; // Kor Duelist
    colours: string[]; // ['White']
    manaCost: string[]; // ['W']
    convertedManaCost: number; // 1
    cardType: string[]; // ['Creature']
    subTypes: string[]; // ['Kor', 'Soldier']
    set: string; // set ID
    rarity: string; // 'Uncommon'
    rulesText: string; // 'As long as Kor Duelist is equipped...' etc.
    keyWords: string[]; // ['Double Strike', 'Equipped']
    power?: number; // 1
    toughness?: number; // 1
    image: string; // url?
};

type Collection = {
    user: string; // User ID
}

type CollectionCard = {
    collection: string; // Collection ID
    quantity: object; // { standard: 4, foil: 1, surge: 0 }
    price: object; // { standard: 0.20, foil: 0.40; surge: null }

}

type Set = {
    name: string; // Murders at Karlov Manor
    code: string; // MKM
    dateReleased: Date; // unix timestamp
    setSymbols: object: // { 'common': url, 'uncommon': url, 'rare': url, 'mythic': url }
};

type Deck = {
    name: string; // Kors
    colours: string; // ['White']
    collection: string; // collection ID
}

type DeckCard = {
    card: string; // Card ID
    deck: string; // Deck ID
    quantity: number; // 4
}
```
