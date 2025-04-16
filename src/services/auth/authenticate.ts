import UserRepo from "@/db/models/repos/user";
import User from "@/db/models/User";
import { checkPassword } from "@/services/auth/hashers";

type UserCredentials = {
    username: string;
    password: string;
};

async function authenticate(
    credentials: UserCredentials
): Promise<User | null> {
    const user = await new UserRepo().getUserByUsername(credentials.username, [
        "isActive",
        "password",
    ]);
    if (
        user &&
        user.isActive &&
        checkPassword(credentials.password, user.password)
    ) {
        return user;
    }
    return null;
}

export { UserCredentials };
export default authenticate;
