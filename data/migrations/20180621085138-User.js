'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            password: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            avatar: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            token: {
                type: Sequelize.TEXT
            },
            tokenExpiresAdd: {
                type: Sequelize.INTEGER
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user');
    }
};
