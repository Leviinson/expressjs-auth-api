import { Op } from "sequelize";

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
    async getUserByEmail(
        email: string,
        attributes?: (keyof UserAttributes)[]
    ): Promise<User | null> {
        return await User.findOne({
            where: { email },
            attributes: attributes,
        });
    }

    async usernameAndEmailAreFree(
        username: string,
        email: string
    ): Promise<{ isFree: boolean; takenFields: string[] }> {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { username: username }],
            },
            attributes: ["username", "email"],
        });

        if (!user) {
            return { isFree: true, takenFields: [] };
        }

        const takenFields: string[] = [];

        if (user.email == email) takenFields.push("email");
        if (user.username == username) takenFields.push("username");

        return { isFree: false, takenFields: takenFields };
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
