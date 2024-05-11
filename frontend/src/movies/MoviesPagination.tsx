import { Pagination } from "@mui/material";
import { ChangeEvent } from "react";

export interface MoviesPaginationProps {
    totalPages: number;
    currentPage: number;
    changePageHandler: (event: ChangeEvent<unknown>, value: number) => void;
}

export const MoviesPagination = (props: MoviesPaginationProps) => {
    const { currentPage, changePageHandler, totalPages } = props;

    return (
        <Pagination
            count={Math.min(totalPages, 500)} // Math.min with 500 because page=500 is the maximum supported by TMDb api else it returns an error
            page={currentPage}
            onChange={changePageHandler}
            sx={{
                "& button, div": { color: "#B5BAC1" },
                "& .Mui-selected": {
                    backgroundColor: "#B5BAC1 !important",
                    color: "black",
                },
                display: "grid",
                justifyContent: "flex-end",
            }}
        />
    );
};
