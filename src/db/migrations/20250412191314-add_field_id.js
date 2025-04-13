"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn("users", "id", {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "ID пользователя",
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn("users", "id");
    },
};
