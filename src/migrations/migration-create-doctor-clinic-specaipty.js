'use strict';

const sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_clinic_specialty', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            clinicId: {
                type: Sequelize.INTEGER,
            },
            specialtyId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('doctor_clinic_specialty');
    },
};
