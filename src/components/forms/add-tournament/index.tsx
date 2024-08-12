'use client';

import { useEffect, useState } from 'react';

import { Form } from 'app/components/form-elements/form';
import { MultiSelectInput } from 'app/components/form-elements/input-multi-select';
import { NumberInput } from 'app/components/form-elements/input-number';
import { SelectInput } from 'app/components/form-elements/input-select';
import { TextInput } from 'app/components/form-elements/input-text';

import { Deck, readActiveDecks } from 'app/server/actions/database/decks';
import { createTournament } from 'app/server/actions/database/tournaments';

import { tournamentFormats } from 'app/options/tournament-formats';
import { useRouter } from 'next/navigation';

export function AddTournamentForm() {
    const [activeDecks, setActiveDecks] = useState<Deck[]>([]);
    const router = useRouter();

    useEffect(() => {
        readActiveDecks().then((decks) => {
            setActiveDecks(decks);
        });
    }, []);

    const deckOptions = activeDecks.map((deck) => {
        return {
            name: deck.name,
            value: deck._id as string
        };
    });

    async function handleSubmit(formData: FormData) {
        const name = formData.get('name') as string;
        const numberOfDecks = formData.get('numberOfDecks') as string;
        const format = formData.get('format') as string;
        const participants = formData.getAll('participants') as string[];

        const response = await createTournament({
            name,
            numberOfDecks: parseInt(numberOfDecks),
            participants,
            format,
            leagueSize: null,
            groupSize: 4,
            winner: null,
            startDate: new Date(),
            endDate: null,
            currentStage: null
        });

        if (response === null) {
            return;
        }

        router.push(`/tournaments/${response._id}`);
    }

    return (
        <Form submitAction={handleSubmit} fixedWidth>
            <TextInput name='name' label='Name' />
            <NumberInput name='numberOfDecks' label='Number of Decks' value={0} />
            <SelectInput name='format' label='Format' options={tournamentFormats} />
            <MultiSelectInput name='participants' label='Participants' options={deckOptions} />
        </Form>
    );
}
