import { connectToDb, closeDb } from "@/db/cursor";

beforeAll(async () => {
    await connectToDb();
});

afterAll(async () => {
    await closeDb();
});
