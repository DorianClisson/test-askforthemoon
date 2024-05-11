import { Request, Response } from "express";
import { TMDb_Axios } from "../utils/axios-utils";
import { errorHandler } from "../utils/error-utils";

export const getMovies = async (req: Request, res: Response) => {
    try {
        const { page, language, minRanking } = req.query;

        const { data } = await TMDb_Axios.get(
            `/discover/movie?page=${page ?? 1}&language=${language ?? "en-US"}${minRanking && parseInt(minRanking as string, 10) >= 0 && parseInt(minRanking as string, 10) <= 10 ? `&vote_average.gte=${minRanking}` : ""}`,
        );
        // default page is 1 | default language is en-US | only add minRanking if exists & valid

        return res.status(200).send(data);
    } catch (e) {
        errorHandler(e, res);
    }
};
