'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('company', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            logo: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            startOfWeekDay: {
                allowNull: false,
                type: Sequelize.ENUM('sunday', 'monday'),
                defaultValue: 'monday'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('company');
    }
};
