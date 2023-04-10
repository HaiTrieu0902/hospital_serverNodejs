'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('clinics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            desciption: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('clinics');
    },
};
