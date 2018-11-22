'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectAssignment = sequelize.define(
        'ProjectAssignment',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_project_assignment'
            },
            projectId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: 'unique_project_assignment'
            },
            hours: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 8
            }
        },
        {
            tableName: 'projectAssignment',
            timestamps: true
        }
    );

    ProjectAssignment.associate = models => {};

    ProjectAssignment.addScopes = models => {};

    return ProjectAssignment;
};
