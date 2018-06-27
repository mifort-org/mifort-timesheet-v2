const { User, Company, CompanyRole, Project, TimesheetRecord, Notification } = require('../data/models');

module.exports = {
    me(_, args, { user }) {
        return User.findById(user.id);
    },
    user(_, { id }) {
        return User.findById(id);
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
    company(_, { id }) {
        return Company.findById(id);
    },
    project(_, { id }) {
        return Project.findById(id);
    }
};
