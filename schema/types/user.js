module.exports = `
    enum Role {
        owner
        resourceManager
        projectManager
        employee
    }
  
    type User {
        id: ID!
        email: String!
        name: String!
        avatar: String!
        token: String
        role(companyId: Int!): Role
        companies: [Company]
        projects(companyId: ID!): [Project]
        timesheetRecords(companyId: ID!): [TimesheetRecord]
        notifications(companyId: ID!): [Notification]
    }
`;
