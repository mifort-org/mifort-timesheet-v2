'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const relation = await queryInterface.createTable('timesheetRecord', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            hours: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            comment: {
                allowNull: false,
                type: Sequelize.STRING
            },
            date: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: Sequelize.NOW,
                unique: 'unique_timesheet_record'
            },
            order: {
                allowNull: false,
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                unique: 'unique_timesheet_record'
            },
            userId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_timesheet_record',
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            companyId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                unique: 'unique_timesheet_record',
                references: {
                    model: 'company',
                    key: 'id'
                }
            },
            projectId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'project',
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

        await queryInterface.addConstraint('timesheetRecord', ['date', 'order', 'userId', 'companyId'], {
            type: 'unique',
            name: 'unique_timesheet_record'
        });

        return relation;
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('timesheetRecord');
    }
};
