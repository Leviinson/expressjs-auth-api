#!/usr/bin/env node
import http from "http";

import debug from "debug";

import app from "../app";
import { connectToDb } from "../db/cursor";

const debugLogger = debug("express.js:server");

const port: number | string | boolean = normalizePort(
    process.env.PORT || "3000"
);
app.set("port", port);

const server = http.createServer(app);
connectToDb()
    .then(() => {
        debugLogger("Successfull connection to the DB");
        server.listen(port);
    })
    .catch((err) => {
        debugLogger("It isn't possible to connect to the DB:", err);
    });

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
