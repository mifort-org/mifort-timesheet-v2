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
        users: [User]
        projects: [Project]
        backupOptions: BackupOptions
        clients: [Client]
        timesheetRecords: [TimesheetRecord]
    }
`;
