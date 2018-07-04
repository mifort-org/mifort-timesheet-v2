module.exports = {
    users(project) {
        return project.getUsers();
    },
    company(project) {
        return project.getCompany();
    },
    client(project) {
        return project.getClient();
    },
    timesheetRecords(project) {
        return project.getTimesheetRecords();
    }
};
