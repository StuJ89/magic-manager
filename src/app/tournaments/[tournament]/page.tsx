'use client';

import { useEffect, useState } from 'react';

import { readTournament, Tournament } from 'app/server/actions/database/tournaments';
import { TournamentSetup } from 'app/components/interfaces/tournament-setup';
import PageLayout from 'app/layouts/page';

type TournamentPageProps = {
    readonly params: {
        readonly tournament: string;
    };
};

export default function Page(props: TournamentPageProps) {
    const [tournament, setTournament] = useState<Tournament | null>(null);

    useEffect(() => {
        readTournament(props.params.tournament).then((response) => {
            setTournament(response);
        });
    }, [props.params.tournament]);

    if (tournament === null) {
        return null;
    }

    return (
        <PageLayout title='Tournament Setup'>
            <TournamentSetup tournament={tournament} />
        </PageLayout>
    );
}
