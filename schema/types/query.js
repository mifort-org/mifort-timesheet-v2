module.exports = `
    type Query {
        me: User @auth
        user(id: ID!): User
        company(id: ID!): Company
        project(id: ID!): Project
    }
`;
