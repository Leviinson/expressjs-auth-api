#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from "http";
import path from "path";

import debug from "debug";

import app from "../app";
import sequelize from "../db/models/index";

const debugLogger = debug("express.js:server");

const port: number | string | boolean = normalizePort(
    process.env.PORT || "3000"
);
app.set("port", port);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

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

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

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
