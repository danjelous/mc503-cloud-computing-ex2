var api_key = 'key-bd9b8b70f0fedf7084a0fb99bcc1711d';
var domain = 'sandbox47481798fa1e4d6d9017dc4e37f5a6b6.mailgun.org';

var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const util = require('util')

// alternative shortcut

function sendMail(req, res, err) {

    var data = {
        from: 'Mailgun Sandbox <postmaster@sandbox47481798fa1e4d6d9017dc4e37f5a6b6.mailgun.org>',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message
    };

    mailgun.messages().send(data, function (error, body) {
        res.status(200).json({
            status: "success",
            message: "Mail sent successfully to " + req.body.to
        })
    });
}

function getMail(req, res, err) {
     res.status(200).json({
            status: "good",
            message: "got it"
        });
}


module.exports = {
    sendMail: sendMail,
    getMail: getMail
}