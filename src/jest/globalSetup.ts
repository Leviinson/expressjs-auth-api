import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

module.exports = async () => {
    process.env.NODE_ENV = "test";

    // to create db for tests if it don't exist
    await execAsync("npx sequelize-cli db:create --env test");
    await execAsync("npx sequelize-cli db:migrate --env test");
};
