'use strict';

module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
        'Company',
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
            logo: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            startOfWeekDay: {
                type: DataTypes.ENUM('sunday', 'monday'),
                allowNull: false,
                defaultValue: 'monday'
            }
        },
        {
            tableName: 'company',
            timestamps: true
        }
    );

    Company.associate = models => {
        Company.belongsToMany(models.User, {
            as: 'users',
            through: 'CompanyRole',
            foreignKey: 'companyId',
            otherKey: 'userId'
        });

        Company.hasOne(models.BackupOptions, {
            as: 'backupOptions',
            foreignKey: 'companyId'
        });

        Company.hasMany(models.Project, {
            as: 'projects',
            foreignKey: 'companyId'
        });

        Company.hasMany(models.Client, {
            as: 'clients',
            foreignKey: 'companyId'
        });

        Company.hasMany(models.Notification, {
            as: 'notifications',
            foreignKey: 'companyId'
        });

        Company.hasMany(models.CompanyRole, {
            as: 'companyRoles',
            foreignKey: 'companyId'
        });

        Company.hasMany(models.Invitation, {
            as: 'invitations',
            foreignKey: 'companyId'
        });
    };

    Company.addScopes = models => {};

    return Company;
};
