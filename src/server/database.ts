import { Db, MongoClient } from 'mongodb';

let client: MongoClient;

export type WithStringId<T> = T & { _id: string };

export async function getDatabase(): Promise<Db> {
    'use server';

    if (client === undefined) {
        client = new MongoClient(process.env.APP_DATABASE_CONNECTION as string);

        await client.connect();

        const closeConnection = async () => {
            try {
                await client.close();
            } catch {
                //
            }
        };

        process.once('SIGINT', closeConnection);
        process.once('SIGTERM', closeConnection);
    }

    return client.db(process.env.APP_DATABASE_NAME as string);
}

export async function getDatabaseCollection<T extends {}>(name: string) {
    'use server';

    const database = await getDatabase();

    return database.collection<T>(name);
}
