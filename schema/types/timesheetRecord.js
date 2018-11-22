module.exports = `
    type TimesheetRecord {
        id: ID!
        hours: Float!
        comment: String
        user: User
        project: Project
        company: Company
    }
`;
