var api_key = 'key-bd9b8b70f0fedf7084a0fb99bcc1711d';
var domain = 'sandbox47481798fa1e4d6d9017dc4e37f5a6b6.mailgun.org';

var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Mailgun Sandbox <postmaster@sandbox47481798fa1e4d6d9017dc4e37f5a6b6.mailgun.org>',
  to: 'ricarda.schagerl@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!<br>Cloud Computing rocks!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});