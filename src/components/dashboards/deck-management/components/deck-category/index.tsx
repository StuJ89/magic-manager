import { DeckCardCategory } from 'app/server/actions/database/deck-cards';

import css from './index.module.css';
import { ManaSymbols } from 'app/components/table-elements/mana-symbols';

export function DeckCategory(props: Omit<DeckCardCategory, 'type'>) {
    const numberOfTotalCards = props.cards
        .map((card) => {
            return card.deckCardQuantity.total;
        })
        .reduce((previous, current) => {
            return previous + current;
        });

    return (
        <div>
            <p className={css.title}>{props.name + ' ' + numberOfTotalCards}</p>
            <div>
                {props.cards.map((deckCard) => {
                    const { card } = deckCard;

                    return (
                        <div className={css.card} key={deckCard._id as string}>
                            <p>{deckCard.deckCardQuantity.total + 'x'}</p>
                            <p>{card.name}</p>
                            <ManaSymbols manaElements={card.manaCost.split('')} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
