'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
                set(password) {
                    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

                    this.setDataValue('password', hash);
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'user',
            timestamps: true,
            instanceMethods: {
                comparePassword(password) {
                    return bcrypt.compare(password, this.password);
                }
            }
        }
    );

    User.associate = models => {
        User.belongsToMany(models.Company, {
            as: 'companies',
            through: 'CompanyRole',
            foreignKey: 'userId',
            otherKey: 'companyId'
        });

        User.belongsToMany(models.Project, {
            as: 'projects',
            through: 'ProjectAssignment',
            foreignKey: 'userId',
            otherKey: 'projectId'
        });

        User.hasMany(models.TimesheetRecord, {
            as: 'timesheetRecords',
            foreignKey: 'userId'
        });
    };

    User.addScopes = models => {};

    return User;
};
