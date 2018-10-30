'use strict';
const nodemailer = require('nodemailer-promise');
const config = require('../config');

const sendEmail = nodemailer.config({
    // todo mailer config data
    service: 'gmail',
    auth: {
        user: 'user@mail.com',
        pass: 'password'
    }
});

module.exports = sendEmail;
