import request from "supertest";

import app from "../src/app";
import { connectToDb, closeDb } from "../src/db/cursor";

beforeAll(async () => {
    await connectToDb();
});

afterAll(async () => {
    await closeDb();
});

describe("GET /", () => {
    it("(unauthorized): it must redirect to the /auth/sigin", async () => {
        const res = await request(app).get("/");
        console.log(res.text);
        expect(res.status).toBe(401);
    });

    it("(authorized): it must display user profile", async () => {
        const res = await request(app).get("/");
        expect(res.body).toEqual({
            id: 1,
            username: "levinsxn",
            email: "example@domain.com",
        });
    });
});
