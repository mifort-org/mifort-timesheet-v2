'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const relation = await queryInterface.createTable('companyRole', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_company_role',
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            companyId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_company_role',
                references: {
                    model: 'company',
                    key: 'id'
                }
            },
            role: {
                allowNull: false,
                type: Sequelize.ENUM('owner', 'resourceManager', 'projectManager', 'employee')
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

        await queryInterface.addConstraint('companyRole', ['userId', 'companyId'], {
            type: 'unique',
            name: 'unique_company_role'
        });

        return relation;
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('companyRole');
    }
};
