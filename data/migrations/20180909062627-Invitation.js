'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const relation = await queryInterface.createTable('invitation', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: 'unique_company_invitation'
            },
            companyId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_company_invitation',
                references: {
                    model: 'company',
                    key: 'id'
                }
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('pending', 'accepted', 'declined'),
                defaultValue: 'pending'
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

        await queryInterface.addConstraint('invitation', ['email', 'companyId'], {
            type: 'unique',
            name: 'unique_company_invitation'
        });

        return relation;
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('invitation');
    }
};
