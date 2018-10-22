const nodemailer = require('nodemailer');
var Config = require(global.__base + '/config/Config');
var {
    smtpHost,
} = new Config();

const sendMail = (option) => {
    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: 25,
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.sendMail(option, (error, info) => {
        if (error) {
            console.log('Send Email Error: ', error);
            throw error;
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};

module.exports = {
    sendMail
};
