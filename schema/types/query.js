module.exports = `
    type Query {
        me: User @auth
        companies: [Company] @auth
        projects(companyId: ID!): [Project] @auth(companyIdField: "companyId")
        users(companyId: ID!): [User] @auth(requires: [owner, resourceManager, projectManager], companyIdField: "companyId")
        clients(companyId: ID!): [Client] @auth(requires: [owner, resourceManager, projectManager], companyIdField: "companyId")
        timesheetRecords(companyId: ID!): [TimesheetRecord] @auth(companyIdField: "companyId")
        notifications(companyId: ID!): [Notification] @auth(requires: [owner], companyIdField: "companyId")
        company(id: ID!): Company @auth(companyIdField: "id")
        project(id: ID!): Project @auth(projectIdField: "id")
        user(id: ID!): User
    }
`;
