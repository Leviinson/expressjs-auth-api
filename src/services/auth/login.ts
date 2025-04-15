import User from "@/db/models/User";

async function login(user: User): Promise<void> {
    user.lastLogin = new Date();
    await user.save({ fields: ["lastLogin"] });
}

export default login;
