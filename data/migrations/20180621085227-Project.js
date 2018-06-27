'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('project', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            code: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            startDate: {
                type: Sequelize.DATEONLY
            },
            endDate: {
                type: Sequelize.DATEONLY
            },
            budget: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            type: {
                allowNull: false,
                type: Sequelize.ENUM('timeAndMaterial', 'fixedFee', 'nonBillable')
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
            clientId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'client',
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
        return queryInterface.dropTable('project');
    }
};
