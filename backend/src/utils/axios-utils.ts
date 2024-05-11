import axios from "axios";
import { TMDB_API_TOKEN } from "./env-variables";

// axios instance that will be used to fetch TMDb api
export const TMDb_Axios = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
});
