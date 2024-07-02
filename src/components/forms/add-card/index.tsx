'use client';

import { Form } from 'app/components/form-elements/form';
import { MultiSelectInput } from 'app/components/form-elements/input-multi-select';
import { MultiTextInput } from 'app/components/form-elements/input-multi-text';
import { TextInput } from 'app/components/form-elements/input-text';

import { createCard } from 'app/server/actions/database/cards';

import { colourOptions } from 'app/options/colours';
import { SelectInput } from 'app/components/form-elements/input-select';

export function AddCardForm() {
    async function handleSubmit(formData: FormData) {
        const name = formData.get('name') as string;
        const colours = formData.getAll('colours') as string[];
        const manaCost = formData.getAll('manaCost') as string[];
        const convertedManaCost = formData.get('convertedManaCost') as string;
        const cardType = formData.getAll('cardType') as string[];
        const subTypes = formData.getAll('subTypes') as string[];
        const set = formData.get('set') as string;
        const rarity = formData.get('rarity') as string;
        const rulesText = formData.get('rulesText') as string;
        const keywords = formData.get('keywords') as string;
        const power = formData.get('power') as string;
        const toughness = formData.get('toughness') as string;
        const image = formData.get('image') as string;

        const result = await createCard({
            name,
            colours,
            manaCost,
            convertedManaCost: parseInt(convertedManaCost),
            cardType,
            subTypes,
            set,
            rarity,
            rulesText,
            keyWords: keywords.split(','),
            power: parseInt(power) ?? null,
            toughness: parseInt(toughness) ?? null,
            image: image ?? null
        });

        if (!result) {
            return;
        }

        console.log(result);
    }

    return (
        <Form submitAction={handleSubmit}>
            <TextInput name='name' label='Name' />
            <MultiSelectInput name='colours' label='Colours' options={colourOptions} />
            <TextInput name='manaCost' label='Mana Cost' />
            <TextInput name='convertedManaCost' label='Converted Mana Cost' />
            <MultiTextInput name='cardType' label='Card Type' />
            <MultiTextInput name='subTypes' label='Sub Types' />
            <SelectInput name='set' label='Set' options={[]} />
            <MultiTextInput name='keywords' label='Keywords' />
        </Form>
    );
}
