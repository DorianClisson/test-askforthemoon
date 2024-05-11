import { Router } from "express";
import { getMovieReviews } from "./getMovieReviews";
import { getMovies } from "./getMovies";

export const moviesRouter = Router();

moviesRouter.get("/movies", getMovies);
moviesRouter.get("/movieReviews", getMovieReviews);
