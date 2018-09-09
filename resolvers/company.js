const { ProjectAssignment } = require('../data/models');

module.exports = {
    users(company) {
        return company.getUsers();
    },
    projects(company, payload, { user }) {
        return company.getProjects({
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
    clients(company) {
        return company.getClients();
    },
    timesheetRecords(company, payload, { user }) {
        return company.getTimesheetRecords({ where: { userId: user.id } });
    },
    invitations(company) {
        return company.getInvitations();
    }
};
