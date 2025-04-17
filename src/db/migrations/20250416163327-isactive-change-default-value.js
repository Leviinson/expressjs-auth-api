"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.changeColumn("users", "isActive", {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: "Флаг активности пользователя (false = деактивирован)",
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.changeColumn("users", "isActive", {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: "Флаг активности пользователя (false = деактивирован)",
        });
    },
};
