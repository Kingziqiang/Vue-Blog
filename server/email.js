'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.126.com',
    ignoreTLS: true,
    port: 25,
   /* secure: true,*/ // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'hilda_blog@126.com',
        pass: 'hildablog126'
    }
});

module.exports = {
    sendMail(to, subject, html){
        let mailOptions = {
            from: 'hilda_blog@126.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html// html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return error;
            }
            console.log('Message %s sent: %s', info.messageId, info.response,'邮件已发送');
        });
    }
}