const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();

//Send deposit
app.post("/api/form", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
          <h3> contact details</h3>
          <ul>
          <li> Name: ${req.body.name}</li>
          <li> Name: ${req.body.email}</li>
          <li><h3> Name: ${req.body.message}</h3></li>
  
          `;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: "info@thecoingrowth.com",
      to: " jerrythewebman@gmail.com",
      replyTo: "info@thecoingrowth.com",
      subject: "new message",
      text: req.body.message,
      html: htmlEmail,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }

      console.log("message sent: %s", info.message);
      console.log("message url %s", nodemailer.getTestMessageUrl(info));
    });
  });
  console.log(req.body);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
