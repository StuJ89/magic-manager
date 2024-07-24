'use client';

import { useRouter } from 'next/navigation';

import { Form } from 'app/components/form-elements/form';
import { MultiSelectInput } from 'app/components/form-elements/input-multi-select';
import { MultiTextInput } from 'app/components/form-elements/input-multi-text';
import { TextInput } from 'app/components/form-elements/input-text';

import { createDeck } from 'app/server/actions/database/decks';

import { colourOptions } from 'app/options/colours';

export function AddDeckForm() {
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const name = formData.get('name') as string;
        const colours = formData.getAll('colours') as string[];
        const keywords = formData.get('keywords') as string;

        const { success } = await createDeck({ name, colours, keywords: keywords.split(',') });

        if (!success) {
            return;
        }

        router.back();
    }

    return (
        <Form submitAction={handleSubmit} buttonLabel='Create Deck' fixedWidth>
            <TextInput name='name' label='Name' />
            <MultiSelectInput name='colours' label='Colours' options={colourOptions} />
            <MultiTextInput name='keywords' label='Keywords' />
        </Form>
    );
}
