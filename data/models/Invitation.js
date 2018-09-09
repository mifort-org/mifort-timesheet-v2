'use strict';

module.exports = (sequelize, DataTypes) => {
    const Invitation = sequelize.define(
        'Invitation',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'unique_company_invitation'
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_company_invitation'
            },
            role: {
                allowNull: false,
                type: DataTypes.ENUM('owner', 'resourceManager', 'projectManager', 'employee')
            },
            status: {
                type: DataTypes.ENUM('pending', 'accepted', 'declined'),
                allowNull: false,
                defaultValue: 'pending'
            }
        },
        {
            tableName: 'invitation',
            timestamps: true
        }
    );

    Invitation.associate = models => {
        Invitation.belongsTo(models.Company, {
            as: 'company',
            foreignKey: 'companyId'
        });

        Invitation.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'email',
            targetKey: 'email'
        });
    };

    Invitation.addScopes = models => {};

    return Invitation;
};
