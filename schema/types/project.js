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
        description: String
        startDate: String
        endDate: String
        type: ProjectType!
        budget: Float
        users: [User]
        company: Company
        client: Client
        timesheetRecords: [TimesheetRecord]
    }
`;
