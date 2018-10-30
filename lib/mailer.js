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

module.exports = {
    async sendResetEmail(userEmail, token) {
        let mailOptions = {
            from: config.mailer.address, // todo add config mailer
            to: userEmail,
            subject: 'Password reset',
            text: `Сlick to reset your password: ${config.url}/restore/password?token=${token}` // todo add config url
        };
        return sendEmail(mailOptions)
            .then(info => {
                console.log('Message sent: %s', info.messageId);
                return 'Please, check your email';
            })
            .catch(error => {
                console.log(error);
                return new Error(error);
            });
    },
};
