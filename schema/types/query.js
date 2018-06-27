module.exports = `
    type Query {
        me: User @auth
        user(id: ID!): User
        companies: [Company] @auth
        company(id: ID!): Company @auth(companyIdField: "id")
        project(id: ID!): Project
    }
`;
