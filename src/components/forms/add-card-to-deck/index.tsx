'use client';

import { Form } from 'app/components/form-elements/form';
import { NumberInput } from 'app/components/form-elements/input-number';

import { CollectionCard } from 'app/server/actions/database/collection-cards';
import { createDeckCard, DeckCard, DeckCardQuantity } from 'app/server/actions/database/deck-cards';

import Image from 'next/image';

import css from './index.module.css';

type AddCardToDeckFormProps = {
    collectionCard: CollectionCard | null;
    deckCard: DeckCard | null;
    deckId: string;
};

export function AddCardToDeckForm(props: AddCardToDeckFormProps) {
    async function handleSubmit(formData: FormData) {
        const standardQuantity = formData.get('standardQuantity') as string;
        const foilQuantity = formData.get('foilQuantity') as string;
        const totalQuantity = parseInt(standardQuantity) + parseInt(foilQuantity);

        const quantity: DeckCardQuantity = {
            standard: parseInt(standardQuantity),
            foil: parseInt(foilQuantity),
            total: totalQuantity
        }

        if (props.collectionCard === null) {
            return;
        }

        if (props.deckCard === null) {
            createDeckCard(props.deckId, props.collectionCard, quantity);
        }

        // Replace with table reload
        window.location.reload();
    };

    const imageElement = () => {
        if (props.collectionCard?.image) {
            return (
                <Image
                    className={css.image}
                    src={props.collectionCard.image}
                    alt={props.collectionCard.name}
                    width={340}
                    height={480}
                />
            );
        }

        return null;
    };

    if (props.collectionCard === null) {
        return null;
    }

    return (
        <div className={css.root}>
            {imageElement()}
            <div className={css.formContainer}>
                <Form submitAction={handleSubmit} buttonLabel='Add to Deck'>
                    <NumberInput
                        label='Standard Quantity'
                        name='standardQuantity'
                        value={props.deckCard?.deckCardQuantity.standard ?? 0}
                        upperLimit={props.collectionCard.quantity.standard - props.collectionCard.quantity.standardInDecks}
                    />
                    <NumberInput
                        label='Foil Quantity'
                        name='foilQuantity'
                        value={props.deckCard?.deckCardQuantity.foil ?? 0}
                        upperLimit={props.collectionCard.quantity.foil - props.collectionCard.quantity.foilInDecks}
                    />
                </Form>
            </div>
        </div>
    );
}
