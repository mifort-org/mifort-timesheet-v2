module.exports = `
    type Query {
        me: User @auth
        user(id: ID!): User
        companies: [Company] @auth
        projects(companyId: ID!): [Project] @auth(companyIdField: "companyId")
        company(id: ID!): Company @auth(companyIdField: "id")
        project(id: ID!): Project @auth(projectIdField: "id")
    }
`;
