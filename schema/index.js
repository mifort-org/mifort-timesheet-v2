const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const typeDefs = require('./types');
const resolvers = require('../resolvers');
const schemaDirectives = require('./directives');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives,
    logger: { log: console.log }
});

addMockFunctionsToSchema({
    schema,
    mocks: {},
    preserveResolvers: true
});

module.exports = schema;
