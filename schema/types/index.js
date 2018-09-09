const query = require('./query');
const mutation = require('./mutation');
const auth = require('./auth');
const backupOptions = require('./backupOptions');
const client = require('./client');
const company = require('./company');
const invitation = require('./invitation');
const notification = require('./notification');
const project = require('./project');
const timesheetRecord = require('./timesheetRecord');
const user = require('./user');

module.exports = [
    query,
    mutation,
    auth,
    backupOptions,
    client,
    company,
    invitation,
    notification,
    project,
    timesheetRecord,
    user
];
