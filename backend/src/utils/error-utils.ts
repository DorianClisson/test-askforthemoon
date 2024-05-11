import { AxiosError } from "axios";
import { Response } from "express";

export const errorHandler = (e: unknown, res: Response): void => {
    console.error(e);
    if (e instanceof AxiosError) {
        res.status(e.response?.status ?? e.status ?? 500).send(
            e.response?.data ?? e.message,
        );
        return;
    }
    res.status(500).send("An error occured!");
};
