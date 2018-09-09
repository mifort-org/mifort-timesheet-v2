module.exports = `
    enum WeekDay {
        sunday
        monday
    }
  
    type Company {
        id: ID!
        name: String!
        logo: String!
        startOfWeekDay: WeekDay!
        users: [User] @auth(requires: [owner, resourceManager, projectManager], searchPath: root, companyIdField: "id")
        projects: [Project] @auth(searchPath: root, companyIdField: "id")
        backupOptions: BackupOptions @auth(requires: [owner], searchPath: root, companyIdField: "id")
        clients: [Client] @auth(requires: [owner, resourceManager, projectManager], searchPath: root, companyIdField: "id")
        timesheetRecords: [TimesheetRecord] @auth(searchPath: root, companyIdField: "id")
        invitations: [Invitation]
    }
`;
