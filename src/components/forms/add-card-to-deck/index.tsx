'use client';

import { Form } from 'app/components/form-elements/form';
import { NumberInput } from 'app/components/form-elements/input-number';

import { CollectionCard } from 'app/server/actions/database/collection-cards';
import { DeckCard } from 'app/server/actions/database/deck-cards';

import Image from 'next/image';

import css from './index.module.css';

type AddCardToDeckFormProps = {
    collectionCard: CollectionCard | null;
    deckCard: DeckCard | null;
};

export function AddCardToDeckForm(props: AddCardToDeckFormProps) {
    const handleSubmit = () => {
        console.log('huh');
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

    return (
        <div className={css.root}>
            {imageElement()}
            <div className={css.formContainer}>
                <Form submitAction={handleSubmit} buttonLabel='Add to Deck'>
                    <NumberInput
                        label='Standard Quantity'
                        name='standardQuantity'
                        value={props.deckCard?.deckCardQuantity.standard ?? 0}
                    />
                    <NumberInput
                        label='Foil Quantity'
                        name='foilQuantity'
                        value={props.deckCard?.deckCardQuantity.foil ?? 0}
                    />
                </Form>
            </div>
        </div>
    );
}
