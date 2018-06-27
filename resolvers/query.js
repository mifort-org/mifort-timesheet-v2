const {
    User,
    Company,
    CompanyRole,
    Project,
    ProjectAssignment,
    TimesheetRecord,
    Notification
} = require('../data/models');
const Role = require('../data/constants/roles');
const { Op } = require('sequelize');

module.exports = {
    me(_, args, { user }) {
        return User.findById(user.id);
    },
    companies(_, payload, { user }) {
        return Company.findAll({
            include: {
                model: CompanyRole,
                as: 'companyRoles',
                attributes: [],
                where: {
                    userId: user.id
                }
            }
        });
    },
    projects(_, { companyId }, { user }) {
        return Project.findAll({
            where: {
                companyId
            },
            include: {
                model: ProjectAssignment,
                as: 'projectAssignments',
                attributes: [],
                where: {
                    userId: user.id
                }
            }
        });
    },
    async users(_, { companyId }, { user }) {
        const { role } = await CompanyRole.findOne({
            where: {
                companyId,
                userId: user.id
            }
        });

        if (role === Role.OWNER || role === Role.RESOURCE_MANAGER) {
            return User.findAll({
                include: {
                    model: CompanyRole,
                    as: 'companyRoles',
                    attributes: [],
                    where: {
                        companyId
                    }
                }
            });
        } else if (role === Role.PROJECT_MANAGER) {
            const projectAssignments = await ProjectAssignment.findAll({
                where: {
                    userId: user.id
                }
            });
            const projectIds = projectAssignments.map(e => e.id);

            return User.findAll({
                where: {
                    id: {
                        [Op.ne]: user.id
                    }
                },
                include: {
                    model: ProjectAssignment,
                    as: 'projectAssignments',
                    attributes: [],
                    where: {
                        projectId: {
                            [Op.in]: projectIds
                        }
                    }
                }
            });
        }
    },
    company(_, { id }) {
        return Company.findById(id);
    },
    project(_, { id }) {
        return Project.findById(id);
    },
    user(_, { id }) {
        return User.findById(id);
    }
};
