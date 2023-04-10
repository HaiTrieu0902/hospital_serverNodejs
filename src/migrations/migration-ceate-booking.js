'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('booking', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            statusId: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            patientId: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
            },
            timeType: {
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
        await queryInterface.dropTable('booking');
    },
};
