module.exports = `
    type Query {
        me: User @auth
        companies: [Company] @auth
        projects(companyId: ID!): [Project] @auth(companyIdField: "companyId")
        users(companyId: ID!): [User] @auth(requires: [owner, resourceManager, projectManager], companyIdField: "companyId")
        company(id: ID!): Company @auth(companyIdField: "id")
        project(id: ID!): Project @auth(projectIdField: "id")
        user(id: ID!): User
    }
`;
