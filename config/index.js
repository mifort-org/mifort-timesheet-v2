'use strict';

const path = require('path');
const config = require('nconf');

config.argv().env();

let appMode = config.get('NODE_ENV') || 'development';

config.file({ file: path.join(__dirname, appMode, 'main.json') });
config.add('common', { type: 'file', file: path.join(__dirname, 'common', 'main.json') });

config.set('params', {
    ...require(path.join(__dirname, 'common', 'params')),
    ...require(path.join(__dirname, appMode, 'params'))
});

config.defaults({
    NODE_ENV: 'development'
});

module.exports = config;
