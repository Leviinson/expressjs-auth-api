import path from "path";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "morgan";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";

dotenv.config();
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

// To connect middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));

// To connect routers
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
