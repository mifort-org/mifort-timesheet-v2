'use strict';
const config = require('../config');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: config.get('aws:accessKeyId'),
    secretAccessKey: config.get('aws:secretAccessKey'),
    region: config.get('aws:region')
});

const transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: config.get('aws:SES:apiVersion')
    })
});

module.exports = {
    async sendResetEmail(userEmail, token) {
        let mailOptions = {
            from: config.get('mailer:address'),
            to: userEmail,
            subject: 'Password reset',
            text: `Сlick to reset your password: ${config.url}/restore/password?token=${token}` // todo add config url
        };
        return transporter
            .sendMail(mailOptions)
            .then(info => {
                console.log('Message sent: %s', info.messageId);
                return 'Please, check your email';
            })
            .catch(error => {
                console.log(error);
                throw new Error(error);
            });
    }
};
