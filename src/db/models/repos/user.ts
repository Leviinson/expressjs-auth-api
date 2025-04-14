import User from "../User";

class UserRepo {
    async getUserById(id: number): Promise<User | null> {
        try {
            return await User.findOne({ where: { id } });
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export default UserRepo;
