module.exports = `
    input ClientInput {
        name: String!
        companyId: ID!
    }
    
    type Client {
        id: ID!
        name: String!
        company: Company!
        projects: [Project]
    }
`;
