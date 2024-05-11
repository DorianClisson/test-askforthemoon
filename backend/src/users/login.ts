import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { databaseConnection } from "../utils/db-utils";
import { JWT_SECRET } from "../utils/env-variables";
import { errorHandler } from "../utils/error-utils";
import { IUser } from "./types";

export const login = async (req: Request, res: Response) => {
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

        if (!user) {
            return res.status(404).send(`User ${username} does not exist`);
        }

        // check is given password is the same as db stored hash password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send(`Incorrect password`);
        }

        // user is logged in generate a jwt and return to client
        const payload = { username, isAdmin: !!user.isAdmin };
        const token = jwt.sign(payload, JWT_SECRET, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });
        return res.status(200).send({ ...payload, accessToken: token });
    } catch (e) {
        errorHandler(e, res);
    }
};
