module.exports = `
    type Query {
        me: User
        user(id: ID!): User
        company(id: ID!): Company
        project(id: ID!): Project
    }
`;
