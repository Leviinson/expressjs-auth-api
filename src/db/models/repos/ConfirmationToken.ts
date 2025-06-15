import logger from "@/services/log";

import ConfirmationToken, {
    ConfirmationTokenAttributes,
    ConfirmationTokenCreationAttributes,
} from "../ConfirmationToken";
import User from "../User";

interface GetTokenByIdParams {
    tokenId: number;
    attributes?: (keyof ConfirmationTokenAttributes)[];
    includesUser?: boolean;
}

interface GetTokenByValueParams {
    tokenValue: string;
    attributes?: (keyof ConfirmationTokenAttributes)[];
    includesUser?: boolean;
}

interface GetTokenByUsernameParams {
    username: string;
    attributes?: (keyof ConfirmationTokenAttributes)[];
}

class ConfirmationTokenRepo {
    async getTokenById({
        tokenId,
        attributes,
        includesUser = false,
    }: GetTokenByIdParams): Promise<ConfirmationToken | null> {
        return await ConfirmationToken.findOne({
            where: { id: tokenId },
            attributes: attributes,
            include: includesUser ? [{ model: User, as: "user" }] : [],
        });
    }

    async getTokenByValue({
        tokenValue,
        attributes,
        includesUser = false,
    }: GetTokenByValueParams): Promise<ConfirmationToken | null> {
        return await ConfirmationToken.findOne({
            where: { value: tokenValue },
            attributes: attributes,
            include: includesUser ? [{ model: User, as: "user" }] : [],
        });
    }

    async getTokenByUsername({
        username,
        attributes,
    }: GetTokenByUsernameParams): Promise<ConfirmationToken | null> {
        return await ConfirmationToken.findOne({
            attributes: attributes,
            include: [
                {
                    model: User,
                    as: "user",
                    where: { username },
                    attributes: [],
                },
            ],
        });
    }

    async create(
        attributes: ConfirmationTokenCreationAttributes
    ): Promise<ConfirmationToken> {
        try {
            return await ConfirmationToken.create({ ...attributes });
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}

export default ConfirmationTokenRepo;
