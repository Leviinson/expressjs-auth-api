import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

module.exports = async () => {
    await execAsync("npx sequelize-cli db:drop --env test");
    await execAsync("npx sequelize-cli db:create --env test");
};
