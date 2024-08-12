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
    price?: object; // { standard: 0.20, foil: 0.40 }
    image: string; // url?
};

type Collection = {
    user: string; // User ID
    name: string; // Stu's Cards
}

type CollectionCard = {
    collection: string; // Collection ID
    quantity: object; // { standard: 4, foil: 1, surge: 0 }

}

type Set = {
    name: string; // Murders at Karlov Manor
    code: string; // MKM
    dateReleased: Date; // unix timestamp
    setSymbols: object: // { 'common': url, 'uncommon': url, 'rare': url, 'mythic': url }
};

type Deck = {
    name: string; // Kors
    colours: string[]; // ['W']
    keywords: string[]; // ['Kor', 'Equipment']
    record: {
        wins: number;
        losses: number;
    }
    active: boolean;
}

type DeckCard = {
    card: string; // Card ID
    deck: string; // Deck ID
    quantity: number; // 4
}

type Tournament = {
    name: string; // MTG Champions League
    numberOfDecks: number; // 64
    format: string; // League | Knockout | Group and Knockout
    leagueSize: number | null;
    groupSize: number | null;
    winner: string | null; // Kors | null
    startDate: Date;
    endDate: Date | null;
    currentStage: string; // group
}

type TournamentDeck = {
    name: string; // Kors
    deckId: string; // deck ID
    tournament: string; // tournament ID
    group: string | null;
    league: string | null;
    record: {
        wins: number;
        losses: number;
        finalPosition: string | null; // 2nd | Quarter Finals | 3rd in Group | etc.
    }
}

type TournamentGame = {
    tournament: string; // tournament ID
    tournamentName: string; // MTG Champions League
    tournamentStage: string; // Group Game | Semi Finals | etc.
    deckOne: {
        id: string;
        name: string;
        isWinner: boolean;
    },
    deckTwo: {
        id: string;
        name: string;
        isWinner: boolean;
    }
}
```
