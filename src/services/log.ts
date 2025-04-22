import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({ filename: "src/logs/error.log", level: "error" }),
        new transports.File({ filename: "src/logs/info.log", level: "info" }),
        new transports.File({ filename: "src/logs/combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            format: format.simple(),
        })
    );
}

export default logger;
