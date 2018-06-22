'use strict';

module.exports = (sequelize, DataTypes) => {
    const CompanyRole = sequelize.define(
        'CompanyRole',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_company_role'
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_company_role'
            },
            role: {
                type: DataTypes.ENUM('owner', 'resourceManager', 'projectManager', 'employee'),
                allowNull: false
            }
        },
        {
            tableName: 'companyRole',
            timestamps: true
        }
    );

    CompanyRole.associate = models => {};

    CompanyRole.addScopes = models => {};

    return CompanyRole;
};
