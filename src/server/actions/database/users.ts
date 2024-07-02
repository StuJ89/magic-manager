import { getDatabaseCollection } from 'app/server/database';

export type User = {
    name: string;
    email: string;
};

export async function readUsersCollection(): Promise<User[]> {
    'use server';

    const collection = await getDatabaseCollection<User>('users');
    const documents = await collection.find().toArray();

    return documents;
}
