import sequelize from "./models/index";

export async function connectToDb() {
    await sequelize.authenticate();
}

export async function closeDb() {
    await sequelize.close()
}
