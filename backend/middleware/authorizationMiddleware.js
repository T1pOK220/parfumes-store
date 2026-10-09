import jwt from "jsonwebtoken";
import { createError } from "../utilities/errorResponse.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const AuthorizationMiddleware = (req, res, next) => {
    const jwtToken = req.headers.authorization?.split(" ")[1];

    if (!jwtToken) {
        throw createError("UNAUTHORIZED", "authorization", "Токен не знайдено", 401, "UnauthorizedError");
    }

    try {
        req.user = jwt.verify(jwtToken, SECRET_KEY);
    } catch (err) {
        const message = err.name === "TokenExpiredError"
            ? "Термін дії токена закінчився"
            : "Невірний токен";
        throw createError("UNAUTHORIZED", "authorization", message, 401, "UnauthorizedError");
    }

    next();
};