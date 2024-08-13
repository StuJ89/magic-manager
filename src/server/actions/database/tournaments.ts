'use server';

import { getDatabaseCollection } from 'app/server/database';
import { ObjectId, WithoutId } from 'mongodb';

export type Tournament = {
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

export type TournamentDeck = {
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

export type TournamentGame = {
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

export async function readTournament(id: string): Promise<Tournament | null> {
    const collection = await getDatabaseCollection<Tournament>('tournaments');
    const document = await collection.findOne({
        _id: new ObjectId(id)
    });

    if (!document) {
        return null;
    }

    document._id = document._id.toString();

    return document;
}
