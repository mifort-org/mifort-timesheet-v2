'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('backupOptions', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            enabled: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            location: {
                allowNull: false,
                type: Sequelize.ENUM('app', 's3', 'ftp'),
                defaultValue: 'app'
            },
            frequency: {
                allowNull: false,
                type: Sequelize.ENUM('daily', 'weekly'),
                defaultValue: 'daily'
            },
            time: {
                allowNull: false,
                type: Sequelize.TIME
            },
            day: {
                type: Sequelize.SMALLINT
            },
            publicKey: {
                type: Sequelize.TEXT
            },
            privateKey: {
                type: Sequelize.TEXT
            },
            url: {
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('backupOptions');
    }
};
