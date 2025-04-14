import { connectToDb, closeDb } from "../src/db/cursor";

beforeAll(async () => {
    await connectToDb();
});

afterAll(async () => {
    await closeDb();
});
