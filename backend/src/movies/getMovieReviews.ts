import { Request, Response } from "express";
import { TMDb_Axios } from "../utils/axios-utils";
import { errorHandler } from "../utils/error-utils";

export const getMovieReviews = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.query;

        if (!movieId) {
            return res.status(400).send("Missing 'movieId' query parameter!");
        }

        const { data } = await TMDb_Axios.get(`/movie/${movieId}/reviews`);

        return res.status(200).send(data);
    } catch (e) {
        errorHandler(e, res);
    }
};
