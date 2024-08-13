import Image from 'next/image';

import { Card } from 'app/server/actions/database/cards';
import {
    CollectionCard,
    createCollectionCard,
    updateCollectionCard
} from 'app/server/actions/database/collection-cards';
import { Form } from 'app/components/form-elements/form';
import { NumberInput } from 'app/components/form-elements/input-number';

import { sessionStore } from 'app/stores';

import { WithoutId } from 'mongodb';

import css from './index.module.css';

type AddCollectionCardFormProps = {
    card: Card;
    collectionCard: CollectionCard | null;
    onClose?: () => void;
};

export function AddCollectionCardForm(props: AddCollectionCardFormProps) {
    const session = sessionStore;

    async function handleSubmit(formData: FormData) {
        const standardQuantity = formData.get('standardQuantity') as string;
        const foilQuantity = formData.get('foilQuantity') as string;
        const inDecksQuantity: number = props.collectionCard !== null ? props.collectionCard.quantity.inDecks : 0;

        const card = { ...props.card } as unknown as WithoutId<Card> & { _id?: string; cardId: string };
        card.cardId = props.card._id as string;
        delete card._id;

        const data = {
            collection: session.collection,
            ...card,
            quantity: {
                standard: parseInt(standardQuantity),
                foil: parseInt(foilQuantity),
                total: parseInt(standardQuantity) + parseInt(foilQuantity),
                inDecks: inDecksQuantity
            }
        };

        let result = null;

        if (props.collectionCard !== null) {
            result = await updateCollectionCard(props.collectionCard._id as string, data);
        } else {
            result = await createCollectionCard(data);
        }

        if (!result) {
            return;
        }

        if (props.onClose) {
            props.onClose();
        }
    }

    const imageElement = () => {
        if (props.card.image) {
            return (
                <Image className={css.image} src={props.card.image} alt={props.card.name} width={340} height={480} />
            );
        }

        return null;
    };

    const determineButtonLabel = () => {
        if (props.collectionCard === null) {
            return 'Add to Collection';
        }

        return 'Update Quantity';
    };

    return (
        <div className={css.root}>
            {imageElement()}
            <div className={css.formContainer}>
                <Form submitAction={handleSubmit} buttonLabel={determineButtonLabel()}>
                    <NumberInput
                        label='Standard Quantity'
                        name='standardQuantity'
                        value={props.collectionCard?.quantity.standard ?? 0}
                    />
                    <NumberInput
                        label='Foil Quantity'
                        name='foilQuantity'
                        value={props.collectionCard?.quantity.foil ?? 0}
                    />
                </Form>
            </div>
        </div>
    );
}
