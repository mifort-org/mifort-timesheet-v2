'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const config = require('./config');
const schema = require('./schema');

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

let port = config.get('server:port') || 3000;
app.listen(port, () => {
    console.info(`Server run in port ${port}`);
});
