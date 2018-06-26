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
        ): Company @auth
    }
`;
