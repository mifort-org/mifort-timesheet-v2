module.exports = {
    user(timesheetRecord) {
        return timesheetRecord.getUser();
    },
    project(timesheetRecord) {
        return timesheetRecord.getProject();
    },
    company(timesheetRecord) {
        return timesheetRecord.getCompany();
    }
};
