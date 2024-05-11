import StarIcon from "@mui/icons-material/Star";
import { Divider, Grid, Typography } from "@mui/material";
import { IMovieReview } from "./types";

type MovieReviewProps = IMovieReview;

export const MovieReview = (props: MovieReviewProps): React.JSX.Element => {
    const {
        author,
        created_at,
        content,
        author_details: { rating },
    } = props;

    return (
        <>
            <Grid container direction="row">
                <Grid item xs={6}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {author}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={2}
                    container
                    alignItems="center"
                    sx={{ width: "fit-content" }}
                >
                    <Typography component="span">{rating}</Typography>
                    <StarIcon
                        sx={{
                            color: "#FDCC0D",
                            fontSize: "16pt",
                            marginLeft: "4px",
                            marginTop: "-2px",
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ textAlign: "end" }}>
                        {new Date(created_at).toDateString()}
                    </Typography>
                </Grid>
            </Grid>
            <Typography
                sx={{
                    fontSize: "0.925rem",
                    fontStyle: "italic",
                    marginTop: "12px",
                    textAlign: "justify",
                }}
            >
                {content}
            </Typography>
            <Divider sx={{ margin: "24px" }} />
        </>
    );
};
