import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import { MoviesPagination, MoviesPaginationProps } from "./MoviesPagination";
import { Language } from "./types";

interface MoviesFiltersProps extends MoviesPaginationProps {
    currentLanguage: Language;
    changeLanguageHandler: (event: SelectChangeEvent<Language>) => void;
    currentMinRanking: string;
    changeMinRankingHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const MoviesFilters = (props: MoviesFiltersProps) => {
    const {
        currentLanguage,
        changeLanguageHandler,
        currentMinRanking,
        changeMinRankingHandler,
        ...moviesPaginationProps
    } = props;

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{ color: "#B5BAC1", marginBottom: "32px" }}
        >
            <Grid item>
                <FormControl
                    sx={{
                        "& .MuiInputLabel-root, .MuiSvgIcon-root": {
                            color: "#B5BAC1",
                        },
                        "& .MuiInputBase-root": {
                            backgroundColor: "#1e1f22",
                            color: "#B5BAC1",
                        },
                    }}
                >
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select<Language>
                        labelId="language-label"
                        label="Language"
                        value={currentLanguage}
                        onChange={changeLanguageHandler}
                    >
                        <MenuItem value="en-US">English</MenuItem>
                        <MenuItem value="fr-FR">French</MenuItem>
                        <MenuItem value="de-DE">German</MenuItem>
                        <MenuItem value="es-ES">Spanish</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="number"
                    label="Minimal ranking"
                    value={currentMinRanking}
                    onChange={changeMinRankingHandler}
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: "#B5BAC1",
                        },
                        "& .MuiInputBase-root": {
                            backgroundColor: "#1e1f22",
                            color: "#B5BAC1",
                        },
                        marginLeft: "32px",
                    }}
                />
            </Grid>
            <MoviesPagination {...moviesPaginationProps} />
        </Grid>
    );
};
