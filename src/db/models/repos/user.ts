import User, { UserAttributes, UserCreationAttributes } from "@/db/models/User";
import logger from "@/services/log";

// type UpdateUserPasswordById = { id: number; user?: never };
// type UpdateUserPasswordByUser = { user: User; id?: never };
// type UpdateUserPassword = (
//     | UpdateUserPasswordById
//     | UpdateUserPasswordByUser
// ) & { password: string };

class UserRepo {
    async getUserById(
        id: number,
        attributes?: (keyof UserAttributes)[]
    ): Promise<User | null> {
        return await User.findOne({
            where: { id },
            attributes: attributes,
        });
    }

    async getUserByUsername(
        username: string,
        attributes?: (keyof UserAttributes)[]
    ): Promise<User | null> {
        return await User.findOne({
            where: { username },
            attributes: attributes,
        });
    }

    async create(userParams: UserCreationAttributes): Promise<User> {
        try {
            return await User.create({ ...userParams });
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    // async updatePassword(params: UpdateUserPassword) {}
}

export default UserRepo;
