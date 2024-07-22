const express = require("express");

const app = express();
const cors=require('cors')
const Mailjet = require('node-mailjet');

// var nodemailer = require('nodemailer');
const toEmail = "kingstone0713@gmail.com"
app.use(express.json());
app.use(cors())

app.post(("/mail"),async (req,res)=>{
  const { email, firstName, lastName, message } = req.body;
  const mailjet = new Mailjet({
    apiKey: 'f77a44695d364010751027572dc2eed5',
    apiSecret: 'fc378ae8ed8bb41d19c60c57228f74bb'
  });
  
  const request = mailjet
  .post('send', { version: 'v3.1' })
  .request({
    Messages: [
      {
        From: {
          // Email: 'krzysztof.pawlikowski@proton.me',
          Email: 'kpawlikowski29@gmail.com',
          Name: 'Mailjet',
        },
        To: [
          {
            Email: toEmail,
            Name: 'Kingstone',
          },
        ],
        ReplyTo: {
          "Email": email,
          "Name": firstName + lastName
        },
        Subject: `New email from ${firstName + lastName}`,
        TextPart: message,
        HtmlPart: `<p>${message}</p>`,
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.error(err.statusCode, err.message);
    });
})

app.listen(3001, () => {
  console.log("Server is Running");
});