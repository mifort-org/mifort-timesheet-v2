const { User, Company, Project, TimesheetRecord, Notification } = require('../data/models');

module.exports = {
    signUp(_, user) {
        return User.create(user);
    }
};
