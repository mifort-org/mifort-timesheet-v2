'use strict';

module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define(
        'Client',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'unique_client_name'
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_client_name'
            }
        },
        {
            tableName: 'client',
            timestamps: true
        }
    );

    Client.associate = models => {
        Client.belongsTo(models.Company, {
            as: 'company',
            foreignKey: 'companyId'
        });

        Client.hasMany(models.Project, {
            as: 'projects',
            foreignKey: 'clientId'
        });
    };

    Client.addScopes = models => {};

    return Client;
};
