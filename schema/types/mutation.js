module.exports = `
    type Mutation {
        signUp(
            email: String!
            name: String!
            password: String!
            avatar: String!
        ): User
        
        logIn(
            email: String!
            password: String!
        ): User
        
        createCompany(
            name: String!
            logo: String!
            startOfWeekDay: WeekDay!
            owners: [Invite]
        ): Company @auth
        
        createProject(
            companyId: ID!
            name: String!
            code: String!
            description: String!
            budget: Float!
            type: ProjectType!
            startDate: String
            endDate: String
            client: ClientInput!
            team: [Invite]         
        ): Project @auth(require: [owner], companyIdField: "companyId")
        
        createTimesheetRecord(
            companyId: ID!
            projectId: ID!
            hours: Float!
            comment: String!
            date: String!
            order: Int!
        ): TimesheetRecord @auth(companyIdField: "companyId", projectIdField: "projectId")
        
         updateTimesheetRecord(
            timesheetRecordId: ID!
            projectId: ID!
            hours: Float!
            comment: String!
            order: Int!
        ): TimesheetRecord @auth(projectIdField: "projectId")
        
         deleteTimesheetRecord(
            timesheetRecordId: ID!
        ): String @auth
    }
`;
