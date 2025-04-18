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

interface GetTokenByUserIdParams {
    userId: number;
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

    async getTokenByUserId({
        userId,
        attributes,
    }: GetTokenByUserIdParams): Promise<ConfirmationToken | null> {
        return await ConfirmationToken.findOne({
            where: { userId },
            attributes: attributes,
        });
    }

    async create(
        attributes: ConfirmationTokenCreationAttributes
    ): Promise<ConfirmationToken> {
        try {
            return await ConfirmationToken.create({ ...attributes });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default ConfirmationTokenRepo;
