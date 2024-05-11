import dotenv from "dotenv";

dotenv.config();

const getEnvVariableOrExit = (envVarStr: string): string => {
    const envVar = process.env[envVarStr];
    if (!envVar) {
        console.error(`Please provide ${envVarStr} env variables!`);
        process.exit();
    }
    return envVar;
};

export const PORT = getEnvVariableOrExit("PORT");
export const TMDB_API_TOKEN = getEnvVariableOrExit("TMDB_API_TOKEN");
export const MONGO_URL = getEnvVariableOrExit("MONGO_URL");
export const JWT_SECRET = getEnvVariableOrExit("JWT_SECRET");
