'use strict';
const nodemailer = require('nodemailer');
const config = require('../config');

const mailer = nodemailer.createTransport({
    // todo mailer config data
    host: config.mailer.host,
    port: config.mailer.port,
    secure: false,
    auth: {
        user: config.mailer.user, // generated ethereal user
        pass: config.mailer.pass // generated ethereal password
    }
});

module.exports = mailer;
