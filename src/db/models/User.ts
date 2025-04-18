import { DataTypes, Model, Optional } from "sequelize";

import { hashPassword } from "@/services/auth/hashers";

import sequelize from "./init";

interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    isActive: boolean;
    lastLogin: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "deletedAt"
        | "lastLogin"
        | "isActive"
    > {}

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public isActive!: boolean;
    public lastLogin!: Date | null;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date | null;

    get isAuthenticated() {
        return true;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "ID пользователя",
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 50],
            },
            comment: "Никнейм",
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            comment: "Почта",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Захешированный пароль",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: "Флаг активности пользователя (false = деактивирован)",
        },
        lastLogin: {
            type: DataTypes.DATE,
            comment: "Последний вход пользователя в систему",
        },
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                user.password = hashPassword(user.password);
            },
            beforeUpdate: async (user) => {
                if (user.changed("password")) {
                    user.password = hashPassword(user.password);
                }
            },
        },
        defaultScope: {
            attributes: {
                exclude: ["password"],
            },
        },
        timestamps: true,
        paranoid: true,
        tableName: "users",
        sequelize: sequelize,
    }
);

export { UserAttributes, UserCreationAttributes };
export default User;

// const User = sequelize.define(
//     "User",
//     {
//         username: {
//             type: DataTypes.STRING(50),
//             allowNull: false,
//             unique: true,
//             validate: {
//                 len: [5, 50],
//             },
//             comment: "Никнейм",
//         },
//         email: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true,
//             },
//             comment: "Почта",
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             comment: "Захешированный пароль",
//         },
//         isActive: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: true,
//             comment: "Флаг активности пользователя (false = деактивирован)",
//         },
//         lastLogin: {
//             type: DataTypes.DATE,
//             allowNull: true,
//             comment: "Последний вход пользователя в систему",
//         },
//     },
//     {
//         hooks: {
//             beforeCreate: async (user) => {
//                 user.password = await bcrypt.hash(user.password, 10);
//             },
//             beforeUpdate: async (user) => {
//                 if (user.changed("password")) {
//                     user.password = await bcrypt.hash(user.password, 10);
//                 }
//             },
//         },
//         defaultScope: {
//             attributes: {
//                 exclude: ["password"],
//             },
//         },
//         timestamps: true,
//         paranoid: true,
//         tableName: "users",
//     }
// );
