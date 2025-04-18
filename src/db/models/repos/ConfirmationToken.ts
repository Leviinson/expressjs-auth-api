import ConfirmationToken, {
    ConfirmationTokenAttributes,
    ConfirmationTokenCreationAttributes,
} from "../ConfirmationToken";

class ConfirmationTokenRepo {
    async getTokenById(
        tokenId: string,
        attributes?: (keyof ConfirmationTokenAttributes)[]
    ): Promise<ConfirmationToken | null> {
        return await ConfirmationToken.findOne({
            where: { id: tokenId },
            attributes: attributes,
        });
    }

    async getTokenByUserId(
        userId: number,
        attributes?: (keyof ConfirmationTokenAttributes)[]
    ): Promise<ConfirmationToken | null> {
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
