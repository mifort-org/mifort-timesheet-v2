'use strict';

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
        'Notification',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            level: {
                type: DataTypes.ENUM('info', 'warning', 'error'),
                allowNull: false,
                defaultValue: 'info'
            },
            isNew: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'notification',
            timestamps: true
        }
    );

    Notification.associate = models => {
        Notification.belongsTo(models.Company, {
            as: 'company',
            foreignKey: 'companyId'
        });
    };

    Notification.addScopes = models => {};

    return Notification;
};
