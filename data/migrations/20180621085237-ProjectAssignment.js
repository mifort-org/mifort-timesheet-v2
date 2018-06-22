'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const relation = await queryInterface.createTable('projectAssignment', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_project_assignment',
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            projectId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_project_assignment',
                references: {
                    model: 'project',
                    key: 'id'
                }
            },
            hours: {
                allowNull: false,
                type: Sequelize.FLOAT,
                defaultValue: 8
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

        await queryInterface.addConstraint('projectAssignment', ['userId', 'projectId'], {
            type: 'unique',
            name: 'unique_project_assignment'
        });

        return relation;
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('projectAssignment');
    }
};
