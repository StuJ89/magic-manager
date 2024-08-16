import { DeckCard } from 'app/server/actions/database/deck-cards';

type DeckCategoryProps = {
    name: string;
    cards: DeckCard[];
};

export function DeckCategory(props: DeckCategoryProps) {
    return (
        <div>
            <p>{props.name}</p>
            <div>
                {props.cards.map((deckCard) => {
                    const { card } = deckCard;
                    return (
                        <div key={deckCard._id as string}>
                            <p>{card.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
