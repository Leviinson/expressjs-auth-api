import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";

const app = express();

// To connect middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));

// To connect routers
app.use("/", userRouter);
app.use("/auth", authRouter);

app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

app.use(function (
    err: { message: string; status: number },
    req: Request,
    res: Response,
    next: NextFunction
) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;
