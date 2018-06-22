module.exports = `
    type Client {
        id: ID!
        name: String!
        company: Company!
        projects: [Project]
    }
`;
