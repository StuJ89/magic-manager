import { Tournament } from 'app/server/actions/database/tournaments';

type TournamentSetupProps = {
    readonly tournament: Tournament;
};

export function TournamentSetup(props: TournamentSetupProps) {
    return (
        <div>
            <h2>{props.tournament.name}</h2>
        </div>
    );
}
