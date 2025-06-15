import { v4 as uuidv4 } from "uuid";

import ConfirmationTokenRepo from "@/db/models/repos/ConfirmationToken";
import UserRepo from "@/db/models/repos/user";

export function generateExpirationDate(currentDate: Date): Date {
    currentDate.setHours(currentDate.getHours() + 24);
    const expDate = currentDate;
    return expDate;
}

export async function validateRegisteredUser(
    username: string,
    email: string,
    userRepo: UserRepo
) {
    const { isFree, takenFields } = await userRepo.usernameAndEmailAreFree(
        username,
        email
    );

    if (!isFree) {
        return {
            isValid: false,
            code: 409,
            status: "error",
            takenFields: takenFields,
            messages: "User with the same credentials already exists.",
        };
    }
    return {
        isValid: true,
    };
}

export async function createUserWithToken(
    username: string,
    email: string,
    password: string
): Promise<{ userId: number; confirmationTokenValue: string }> {
    const userRepo = new UserRepo();
    const confirmationTokenRepo = new ConfirmationTokenRepo();

    const user = await userRepo.create({ username, email, password });
    const confirmationToken = await confirmationTokenRepo.create({
        expAt: generateExpirationDate(new Date()),
        userId: user.id,
        value: uuidv4(),
    });

    return {
        userId: user.id,
        confirmationTokenValue: confirmationToken.value,
    };
}
