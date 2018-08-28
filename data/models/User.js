'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isEmpty = require('lodash/isEmpty');

const config = require('../../config');

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
            },
            token: {
                type: DataTypes.TEXT
            },
            tokenExpiresAdd: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'user',
            timestamps: true
        }
    );

    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    };

    User.prototype.checkCompanyConnection = async function(companyId, roles) {
        const companyConnection = await sequelize.models.CompanyRole.findOne({
            where: { userId: this.id, companyId }
        });

        if (isEmpty(roles)) {
            return !isEmpty(companyConnection);
        }

        return companyConnection && roles.includes(companyConnection.role);
    };

    User.prototype.checkProjectConnection = async function(projectId) {
        const projectConnection = await sequelize.models.ProjectAssignment.findOne({
            where: { userId: this.id, projectId }
        });

        return !isEmpty(projectConnection);
    };

    User.prototype.generateToken = function() {
        return jwt.sign({ id: this.id }, config.get('jwt:secret'), config.get('jwt:options'));
    };

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

        User.hasMany(models.ProjectAssignment, {
            as: 'projectAssignments',
            foreignKey: 'userId'
        });
    };

    User.addScopes = models => {};

    return User;
};
