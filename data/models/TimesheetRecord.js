'use strict';

module.exports = (sequelize, DataTypes) => {
    const TimesheetRecord = sequelize.define(
        'TimesheetRecord',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            hours: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                unique: 'unique_timesheet_record'
            },
            order: {
                type: DataTypes.SMALLINT,
                allowNull: false,
                defaultValue: 0,
                unique: 'unique_timesheet_record'
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_timesheet_record'
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_timesheet_record'
            },
            projectId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'timesheetRecord',
            timestamps: true
        }
    );

    TimesheetRecord.associate = models => {
        TimesheetRecord.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });

        TimesheetRecord.belongsTo(models.Company, {
            as: 'company',
            foreignKey: 'companyId'
        });

        TimesheetRecord.belongsTo(models.Project, {
            as: 'project',
            foreignKey: 'projectId'
        });

        TimesheetRecord.belongsTo(models.Company, {
            as: 'companies',
            through: 'CompanyRole',
            foreignKey: 'timesheetRecordId',
            otherKey: 'companyId'
        });
    };

    TimesheetRecord.addScopes = models => {};

    return TimesheetRecord;
};
