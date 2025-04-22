import path from "path";

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import createError from "http-errors";
import logger from "morgan";

import csrfMiddleware from "./middlewares/csrf";
import validationMiddleware from "./middlewares/validation";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

dotenv.config();
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

// To connect middlewares
app.use(logger("dev"));
app.use(
    cors({
        origin: process.env
            .CORS_ORIGINS!.split(",")
            .map((origin) => origin.trim()),
    })
);
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "font-src": ["'self'", "https:"],
            },
        },
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);
/**
 * CSRF tokens will be generated
 * usign mask, that is always random.
 *
 * Because of this this API will be defended
 * from BREACH attacks.
 */
app.use(compression());
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));

// To connect routers
app.use("/", validationMiddleware);
app.use("/", csrfMiddleware);
app.use("/me", userRouter);
app.use("/auth", authRouter);

app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

app.use(function (
    err: { message: string; status: number },
    req: Request,
    res: Response,
    _next: NextFunction
) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;
