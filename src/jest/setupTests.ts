import { connectToDb, closeDb } from "@/db/cursor";
import sequelize from "@/db/models/init";

beforeAll(async () => {
    await connectToDb();
});

afterAll(async () => {
    await closeDb();
});

afterEach(async () => {
    await sequelize.sync({ force: true });
});
