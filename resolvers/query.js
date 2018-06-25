const { User, Company, Project, TimesheetRecord, Notification } = require('../data/models');

module.exports = {
    me(_, args, { user }) {
        return User.findById(user.id);
    },
    user(_, { id }) {
        return User.findById(id);
    },
    company(_, { id }) {
        return Company.findById(id);
    },
    project(_, { id }) {
        return Project.findById(id);
    }
};
