import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "./init";
import User from "./User";

interface ConfirmationTokenAttributes {
    id?: number;
    userId: number;
    expAt: Date;
    value: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ConfirmationTokenCreationAttributes
    extends Optional<
        ConfirmationTokenAttributes,
        "id" | "createdAt" | "updatedAt"
    > {}

class ConfirmationToken
    extends Model<
        ConfirmationTokenAttributes,
        ConfirmationTokenCreationAttributes
    >
    implements ConfirmationTokenAttributes
{
    declare id: number;
    declare userId: number;
    declare expAt: Date;
    declare value: string;
    declare user: User;
    declare createdAt: Date;
    declare updatedAt: Date;
}

ConfirmationToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "ID токена подтверждения почты",
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ID пользователя для активации",
        },
        expAt: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "Дата истечения срока действия токена",
        },
        value: {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: "Значение токена",
        },
    },
    { timestamps: true, tableName: "confirmation_tokens", sequelize: sequelize }
);

ConfirmationToken.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(ConfirmationToken, {
    foreignKey: "userId",
    as: "confirmationTokens",
});

export { ConfirmationTokenAttributes, ConfirmationTokenCreationAttributes };
export default ConfirmationToken;
