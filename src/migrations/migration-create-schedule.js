'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            currentNumber: {
                type: Sequelize.INTEGER,
            },
            maxNumber: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
            },
            timeType: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            roleid: {
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
        await queryInterface.dropTable('schedules');
    },
};
