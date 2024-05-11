import StarIcon from "@mui/icons-material/Star";
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Tooltip,
    Typography,
} from "@mui/material";
import { IMovie } from "./types";
import { useMovieReviewsDialog } from "./useMovieReviewsDialog";

interface MovieProps extends IMovie {
    openMovieReviewsDialog: ReturnType<
        typeof useMovieReviewsDialog
    >["openMovieReviewsDialog"];
}

export const Movie = (props: MovieProps): React.JSX.Element => {
    const {
        id,
        openMovieReviewsDialog,
        poster_path,
        title,
        release_date,
        vote_average,
        vote_count,
    } = props;

    return (
        <Card
            onClick={() => openMovieReviewsDialog(id, title)}
            sx={{
                backgroundColor: "#B5BAC1",
                cursor: "pointer",
                marginBottom: "32px",
                maxWidth: 200,
                textAlign: "center",
            }}
        >
            <CardMedia
                image={`https://image.tmdb.org/t/p/original/${poster_path}`}
                component="img"
                loading="lazy" // set component=img + loading=lazy to lazy load if browser is compatible
                title={`${title} image`}
                sx={{ height: 300, width: 200 }}
            />
            <CardContent>
                <Tooltip title={title} arrow={true} placement="top">
                    <Typography
                        noWrap
                        sx={{ fontWeight: "bold", marginBottom: "4px" }}
                    >
                        {title}
                    </Typography>
                </Tooltip>
                <Typography sx={{ fontStyle: "italic", marginBottom: "4px" }}>
                    {release_date}
                </Typography>
                <Grid container direction="row" justifyContent="center">
                    <Typography>{vote_average.toFixed(1)}</Typography>
                    <StarIcon
                        sx={{
                            color: "#FDCC0D",
                            fontSize: "16pt",
                            marginLeft: "4px",
                            marginRight: "8px",
                        }}
                    />
                    <Typography sx={{ fontSize: "0.875rem" }}>
                        ({vote_count})
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};
