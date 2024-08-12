'use server';

import { getDatabaseCollection } from 'app/server/database';
import { ObjectId, WithoutId } from 'mongodb';

type Tournament = {
    _id: string | ObjectId;
    name: string;
    numberOfDecks: number;
    participants: string[];
    format: string;
    leagueSize: number | null;
    groupSize: number | null;
    winner: string | null;
    startDate: Date;
    endDate: Date | null;
    currentStage: string | null;
};

type TournamentDeck = {
    _id: string | ObjectId;
    name: string;
    deckId: string;
    tournament: string;
    group: string | null;
    league: string | null;
    record: {
        wins: number;
        losses: number;
        finalPosition: string | null;
    };
};

type TournamentGame = {
    _id: string | ObjectId;
    tournament: string;
    tournamentName: string;
    tournamentStage: string;
    group: string | null;
    league: string | null;
    deckOne: {
        id: string;
        name: string;
        isWinner: boolean;
    };
    deckTwo: {
        id: string;
        name: string;
        isWinner: boolean;
    };
};

export async function createTournament(data: WithoutId<Tournament>): Promise<Tournament | null> {
    const tournamentCollection = await getDatabaseCollection<Tournament>('tournaments');
    const tournament = await tournamentCollection.insertOne(data as Tournament);

    const result = await tournamentCollection.findOne({
        _id: tournament.insertedId
    });

    if (!result) {
        return null;
    }

    result._id = result._id.toString();

    return result;
}
