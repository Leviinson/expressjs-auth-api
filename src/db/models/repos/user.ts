import User, { UserAttributes, UserCreationAttributes } from "@/db/models/User";

// type UpdateUserPasswordById = { id: number; user?: never };
// type UpdateUserPasswordByUser = { user: User; id?: never };
// type UpdateUserPassword = (
//     | UpdateUserPasswordById
//     | UpdateUserPasswordByUser
// ) & { password: string };

class UserRepo {
    async getUserById(id: number): Promise<User | null> {
        return await User.findOne({
            where: { id },
            attributes: ["id", "username", "email"],
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

    async create(userParams: UserCreationAttributes): Promise<void> {
        try {
            await User.create({ ...userParams });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // async updatePassword(params: UpdateUserPassword) {}
}

export default UserRepo;
