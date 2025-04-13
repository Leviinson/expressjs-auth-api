"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.createTable("users", {
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                comment: "Никнейм",
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
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
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                comment:
                    "Дата удаления пользователя (для паранойдного удаления)",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.dropTable("users");
    },
};
