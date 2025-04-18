"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn("confirmation_tokens", "value", {
            type: DataTypes.STRING(36),
            allowNull: false,
            comment: "Значение токена",
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn("confirmation_tokens", "value");
    },
};
