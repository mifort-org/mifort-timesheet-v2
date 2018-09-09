module.exports = {
    companies(user) {
        return user.getCompanies();
    },
    projects(user) {
        return user.getProjects();
    },
    timesheetRecords(user) {
        return user.getTimesheetRecords();
    },
    notifications(user) {
        return user.getNotifications();
    },
    invitations(user) {
        return user.getInvitations();
    }
};
