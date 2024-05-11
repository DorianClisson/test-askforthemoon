import {
    Box,
    CircularProgress,
    Grid,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { BackendAxios } from "../utils/BackendAxios";
import { Movie } from "./Movie";
import { MoviesFilters } from "./MoviesFilters";
import { MoviesPagination } from "./MoviesPagination";
import { IMoviesData, Language } from "./types";
import { useMovieReviewsDialog } from "./useMovieReviewsDialog";

const fetchMovies = async (
    page: number,
    language: Language,
    minRanking: string,
): Promise<IMoviesData> => {
    const { data } = await BackendAxios.get<IMoviesData>(
        `/movies?page=${page}&language=${language}&minRanking=${minRanking}`,
    );

    return data;
};

export const Movies = (): React.JSX.Element => {
    const [language, setLanguage] = useState<Language>("en-US");
    const [minRanking, setMinRanking] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const { MovieReviewsDialog, openMovieReviewsDialog } =
        useMovieReviewsDialog();

    const {
        error,
        data: moviesData,
        isLoading,
    } = useQuery<IMoviesData>({
        queryKey: ["fetchMovies", page, language, minRanking], // give page & minRanking & language as keys so that react-query inner cache will be well applied
        queryFn: () => fetchMovies(page, language, minRanking),
        placeholderData: keepPreviousData,
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <Typography sx={{ color: "red" }}>
                An error occured: please contact server staff!
            </Typography>
        );
    }

    if (!moviesData) {
        return <Typography>No data to display!</Typography>;
    }

    const changeLanguageHandler = ({
        target: { value },
    }: SelectChangeEvent<Language>) => {
        setLanguage(value as Language);
    };

    const changeMinRankingHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setMinRanking(value);
    };

    const changePageHandler = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo(0, 0); // force scroll to top for better ux
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#313338",
                    margin: "auto",
                    padding: "24px 48px",
                    width: "66%",
                }}
            >
                <MoviesFilters
                    currentLanguage={language}
                    changeLanguageHandler={changeLanguageHandler}
                    currentMinRanking={minRanking}
                    changeMinRankingHandler={changeMinRankingHandler}
                    totalPages={moviesData.total_pages}
                    currentPage={page}
                    changePageHandler={changePageHandler}
                />

                <Grid container direction="row">
                    {moviesData.results.map((movie) => (
                        <Grid key={movie.id} item xs={2}>
                            <Movie
                                {...movie}
                                openMovieReviewsDialog={openMovieReviewsDialog}
                            />
                        </Grid>
                    ))}
                </Grid>

                <MoviesPagination
                    totalPages={moviesData.total_pages}
                    currentPage={page}
                    changePageHandler={changePageHandler}
                />
            </Box>
            <MovieReviewsDialog />
        </>
    );
};
