import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

module.exports = async () => {
    process.env.NODE_ENV = "test";
    await execAsync("npx sequelize-cli db:migrate --env test");
};
