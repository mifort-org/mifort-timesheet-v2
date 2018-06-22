'use strict';

module.exports = (sequelize, DataTypes) => {
    const BackupOptions = sequelize.define(
        'BackupOptions',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            enabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            location: {
                type: DataTypes.ENUM('app', 's3', 'ftp'),
                allowNull: false,
                defaultValue: 'app'
            },
            frequency: {
                type: DataTypes.ENUM('daily', 'weekly'),
                allowNull: false,
                defaultValue: 'daily'
            },
            time: DataTypes.TIME,
            day: {
                type: DataTypes.SMALLINT,
                validate: {
                    min: 0,
                    max: 6
                }
            },
            publicKey: DataTypes.TEXT,
            privateKey: DataTypes.TEXT,
            url: DataTypes.TEXT,
            companyId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'backupOptions',
            timestamps: true
        }
    );

    BackupOptions.associate = models => {
        BackupOptions.belongsTo(models.Company, {
            as: 'company',
            foreignKey: 'companyId'
        });
    };

    BackupOptions.addScopes = models => {};

    return BackupOptions;
};
