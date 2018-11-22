'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const relation = await queryInterface.createTable('client', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: 'unique_client_name'
            },
            companyId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_client_name',
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

        await queryInterface.addConstraint('client', ['name', 'companyId'], {
            type: 'unique',
            name: 'unique_client_name'
        });

        return relation;
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('client');
    }
};
