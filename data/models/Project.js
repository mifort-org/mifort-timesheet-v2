'use strict';

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
        'Project',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: DataTypes.TEXT,
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY,
            budget: DataTypes.FLOAT,
            type: {
                type: DataTypes.ENUM('timeAndMaterial', 'fixedFee', 'nonBillable'),
                allowNull: false,
                defaultValue: 'nonBillable'
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            clientId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'project',
            timestamps: true
        }
    );

    Project.associate = models => {
        Project.belongsToMany(models.User, {
            as: 'users',
            through: 'ProjectAssignment',
            foreignKey: 'projectId',
            otherKey: 'userId'
        });

        Project.belongsTo(models.Client, {
            as: 'client',
            foreignKey: 'clientId'
        });

        Project.belongsTo(models.Company, {
            as: 'company',
            foreignKey: 'companyId'
        });

        Project.hasMany(models.TimesheetRecord, {
            as: 'timesheetRecords',
            foreignKey: 'projectId'
        });
    };

    Project.addScopes = models => {};

    return Project;
};
