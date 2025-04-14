import sequelize from "./models/init";

export async function connectToDb() {
    await sequelize.authenticate();
}

export async function closeDb() {
    await sequelize.close();
}
