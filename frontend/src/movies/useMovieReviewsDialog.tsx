import CloseIcon from "@mui/icons-material/Close";
import { CardContent, Dialog, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { MovieReviews } from "./MovieReviews";

export const useMovieReviewsDialog = (): {
    MovieReviewsDialog: () => React.JSX.Element;
    openMovieReviewsDialog: (movieId: string, movieTitle: string) => void;
} => {
    const [isDialogOpened, setIsDialogOpened] = useState<
        false | { movieId: string; movieTitle: string }
    >(false); // false => close else movieId => open

    const openMovieReviewsDialog = (movieId: string, movieTitle: string) => {
        setIsDialogOpened({ movieId, movieTitle });
    };

    const closeMovieReviewsDialog = () => {
        setIsDialogOpened(false);
    };

    const MovieReviewsDialog = (): React.JSX.Element => {
        return (
            <Dialog
                open={!!isDialogOpened}
                onClose={closeMovieReviewsDialog}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#B5BAC1",
                        minHeight: 400,
                        maxHeight: 800,
                        minWidth: 1000,
                        overflow: "scroll",
                    },
                }}
            >
                {isDialogOpened && (
                    <CardContent sx={{ padding: "48px", paddingTop: "32px" }}>
                        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                            {isDialogOpened.movieTitle} reviews
                        </Typography>
                        <IconButton
                            onClick={closeMovieReviewsDialog}
                            sx={{
                                position: "absolute",
                                right: "8px",
                                top: "8px",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <MovieReviews movieId={isDialogOpened.movieId} />
                    </CardContent>
                )}
            </Dialog>
        );
    };

    return { MovieReviewsDialog, openMovieReviewsDialog };
};
