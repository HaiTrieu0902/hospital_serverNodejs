'use strict';

// firstName: DataTypes.STRING,
// lastName: DataTypes.STRING,
// email: DataTypes.STRING,
// password: DataTypes.STRING,
// address: DataTypes.STRING,
// gender: DataTypes.BOOLEAN,
// roleid: DataTypes.STRING,
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'Alex',
                lastName: 'HaiTrieu',
                email: 'admin@gmail.com',
                password: '123456',
                address: 'Ha Noi',
                gender: 1,
                typeRole: 'ROLE',
                keyRole: 'R1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
