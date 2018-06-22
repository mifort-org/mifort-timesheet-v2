'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('notification', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            message: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            level: {
                allowNull: false,
                type: Sequelize.ENUM('info', 'warning', 'error'),
                defaultValue: 'info'
            },
            isNew: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            companyId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'company',
                    key: 'id'
                }
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
        return queryInterface.dropTable('notification');
    }
};
