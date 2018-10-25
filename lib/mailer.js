'use strict';
const nodemailer = require('nodemailer-promise');
const config = require('../config');

const sendEmail = nodemailer.config({
    // todo mailer config data
    // // host: config.mailer.host,
    // // port: config.mailer.port,
    // // secure: false,
    // // auth: {
    // //     user: config.mailer.user,
    // //     pass: config.mailer.pass
    // }
    service: 'gmail',
    auth: {
        user: 'user@mail.com',
        pass: 'password'
    }
});

module.exports = sendEmail;
