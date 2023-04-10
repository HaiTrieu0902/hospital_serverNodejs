'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('histories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            patientId: {
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            description: {
                type: Sequelize.TEXT,
            },
            files: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('histories');
    },
};
