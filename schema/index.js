const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const typeDefs = require('./types');
const resolvers = require('../resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: { log: console.log }
});

addMockFunctionsToSchema({
    schema,
    mocks: {},
    preserveResolvers: true
});

module.exports = schema;
