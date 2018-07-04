module.exports = `
    enum ProjectType {
        timeAndMaterial
        fixedFee
        nonBillable
    }
  
    type Project {
        id: ID!
        name: String!
        code: String!
        description: String!
        startDate: String
        endDate: String
        type: ProjectType!
        budget: Float!
        users: [User] @auth(requires: [owner, resourceManager, projectManager], searchPath: root, companyIdField: "companyId")
        company: Company @auth(requires: [owner, resourceManager, projectManager], searchPath: root, companyIdField: "companyId")
        client: Client @auth(requires: [owner, resourceManager, projectManager], searchPath: root, companyIdField: "companyId")
        timesheetRecords: [TimesheetRecord]
    }
`;
