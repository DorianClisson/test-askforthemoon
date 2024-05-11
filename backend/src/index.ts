import cors, { CorsOptions } from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { moviesRouter } from "./movies/router";
import { usersRouter } from "./users/router";
import { JWT_SECRET, PORT } from "./utils/env-variables";

const app = express();

// cors
const corsOptions: CorsOptions = {
    origin: (_origin, callback) => {
        callback(null, true); // no CORS check for simplification for this test
    },
};
app.use(cors(corsOptions));

// body parser
app.use(express.json());

// auth router
app.use(usersRouter);

// add a middleware to check auth before movies routes
app.use((req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token || typeof token !== "string") {
        return res.status(403).send({ message: "No jwt token provided!" });
    }

    jwt.verify(token, JWT_SECRET, (err) => {
        if (err) {
            return res.sendStatus(401);
        }
        next();
    });
});
app.use(moviesRouter);

app.listen(PORT, () => {
    console.log(`BACKEND listening on port ${PORT}`);
});
