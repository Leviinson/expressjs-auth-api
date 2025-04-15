import hashPassword from "../../../services/auth/hashers";
import User, { UserCreationAttributes } from "../User";

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

    async create(userParams: UserCreationAttributes): Promise<User> {
        userParams.password = hashPassword(userParams.password);
        return await User.create({ ...userParams });
    }

    // async updatePassword(params: UpdateUserPassword) {}
}

export default UserRepo;
