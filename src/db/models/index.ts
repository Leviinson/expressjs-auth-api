import { Sequelize } from "sequelize";

import dbConfig from "../config";

type Mode = "development" | "test" | "production";
const currentConfig = dbConfig[(process.env.NODE_ENV as Mode) || "development"];

const sequelize = new Sequelize(
    currentConfig.database!,
    currentConfig.username!,
    currentConfig.password!,
    {
        dialect: "mysql",
        host: currentConfig.host,
        port: currentConfig.port ? parseInt(currentConfig.port) : 3306,
    }
);

export default sequelize;
