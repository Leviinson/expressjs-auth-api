#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app";
import debug from "debug";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import sequelize from "../db/models/index";

dotenv.config();
const debugLogger = debug("express.js:server");

/**
 * Get port from environment and store in Express.
 */
const port: number | string | boolean = normalizePort(
    process.env.PORT || "3000"
);
app.set("port", port);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

sequelize
    .authenticate()
    .then(() => {
        debugLogger("Успешно выполнено подключение к базе данных.");
    })
    .catch((err) => {
        debugLogger("Невозможно подключиться к базе данных:", err);
    });

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | false {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
    const addr = server.address();

    if (addr === null) {
        debugLogger("Server address is null.");
        return;
    }

    const bind =
        typeof addr === "string"
            ? "pipe " + addr
            : "IP http://localhost:" + addr.port;
    debugLogger("Listening on " + bind);
}
