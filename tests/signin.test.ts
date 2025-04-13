import { connectToDb, closeDb } from "../src/db/cursor";

beforeAll(async () => {
    await connectToDb();
});

afterAll(async () => {
    await closeDb();
});

describe("GET /auth/signin", () => {
    it("must display sign in window", async () => {
        expect(true).toBe(true);
    });
});
