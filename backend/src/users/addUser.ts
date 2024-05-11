import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { databaseConnection } from "../utils/db-utils";
import { errorHandler } from "../utils/error-utils";
import { IUser } from "./types";

export const addUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || typeof username !== "string") {
            return res
                .status(400)
                .send("Please provide username query parameter");
        }
        if (!password || typeof password !== "string") {
            return res
                .status(400)
                .send("Please provide password query parameter");
        }

        const db = await databaseConnection();
        const user = await db.collection<IUser>("users").findOne({ username });

        if (user) {
            return res.status(400).send(`User ${username} already exists`);
        }

        // store the new user with hashed password
        await db
            .collection<IUser>("users")
            .insertOne({ username, password: await bcrypt.hash(password, 8) });

        return res.sendStatus(201);
    } catch (e) {
        errorHandler(e, res);
    }
};
