import dotenv from "dotenv";
dotenv.config();

export const development = {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    port: process.env.DEV_DB_PORT,
    host: process.env.DEV_DB_HOST,
    dialect: "mysql",
};

export const test = {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    port: process.env.TEST_DB_PORT,
    host: process.env.TEST_DB_HOST,
    dialect: "mysql",
};

export const production = {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    port: process.env.PROD_DB_PORT,
    host: process.env.PROD_DB_HOST,
    dialect: "mysql",
};

export default { development, test, production };
