import { CircularProgress, Grid, Typography } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BackendAxios } from "../utils/BackendAxios";
import { MovieReview } from "./MovieReview";
import { IMovieReviewsData } from "./types";

const fetchMovieReviews = async (
    movieId: string,
): Promise<IMovieReviewsData> => {
    const { data } = await BackendAxios.get<IMovieReviewsData>(
        `/movieReviews?movieId=${movieId}`,
    );

    return data;
};

interface MovieReviewsProps {
    movieId: string;
}

export const MovieReviews = (props: MovieReviewsProps): React.JSX.Element => {
    const { movieId } = props;

    const {
        error,
        data: reviewsData,
        isLoading,
    } = useQuery<IMovieReviewsData>({
        queryKey: ["fetchMovieReviews", movieId], // movieId as keys so that react-query inner cache will be well applied
        queryFn: () => fetchMovieReviews(movieId),
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

    if (!reviewsData || reviewsData.results.length === 0) {
        return <Typography>No reviews to display.</Typography>;
    }

    return (
        <Grid container direction="column">
            {reviewsData.results.map((review) => (
                <MovieReview key={review.id} {...review} />
            ))}
        </Grid>
    );
};
