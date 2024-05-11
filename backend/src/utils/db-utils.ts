import { Db, MongoClient } from "mongodb";
import { MONGO_URL } from "./env-variables";

let cachedClient: MongoClient | null = null;

export const databaseConnection = async (): Promise<Db> => {
    if (cachedClient) {
        return cachedClient.db();
    }

    const client = await MongoClient.connect(`mongodb://${MONGO_URL}`);
    cachedClient = client;

    return client.db();
};
