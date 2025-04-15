import User, { UserCreationAttributes } from "@/db/models/User";

// type UpdateUserPasswordById = { id: number; user?: never };
// type UpdateUserPasswordByUser = { user: User; id?: never };
// type UpdateUserPassword = (
//     | UpdateUserPasswordById
//     | UpdateUserPasswordByUser
// ) & { password: string };

class UserRepo {
    async getUserById(id: number): Promise<User | null> {
        return await User.findOne({ where: { id } });
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return await User.findOne({
            where: { username },
            attributes: ["id", "username", "password"],
        });
    }

    async create(userParams: UserCreationAttributes): Promise<User> {
        return await User.create({ ...userParams });
    }

    // async updatePassword(params: UpdateUserPassword) {}
}

export default UserRepo;
