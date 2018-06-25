'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const config = require('./config');
const schema = require('./schema');

const app = express();

app.use(
    '/graphql',
    bodyParser.json(),
    jwt({
        secret: config.get('jwt:secret'),
        credentialsRequired: false
    }),
    graphqlExpress(req => ({
        schema,
        context: req
    }))
);

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
        passHeader: `"Authorization": "Bearer ${config.get('params:jwt:token')}"`
    })
);

let port = config.get('server:port') || 3000;
app.listen(port, () => {
    console.info(`Server run in port ${port}`);
});
