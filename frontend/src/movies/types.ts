export interface IMovie {
    id: string;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

export interface IMoviesData {
    results: IMovie[];
    total_pages: number;
}

export interface IMovieReview {
    id: string;
    author: string;
    created_at: string;
    content: string;
    author_details: {
        rating: number;
    };
}

export interface IMovieReviewsData {
    results: IMovieReview[];
}

export type Language = "en-US" | "fr-FR" | "es-ES" | "de-DE";
