const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.post("/api/form", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        
        <h3> ${req.body.message}</h3>

        `;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.THE_EMAIL,
        pass: process.env.THE_PASSWORD,
      },
    });

    let mailOptions = {
      from: "info@thecoingrowth.com",
      to: req.body.email,
      replyTo: "test@testaccount.com",
      subject: req.body.subject,
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

//serve static assets in production and deploy to heroku
//check if our node environment === production
if (process.env.NODE_ENV === "production") {
  //set static folder//telling express to load the client/build/index.html file
  app.use(express.static("client/build"));
  //for any request that is not from /api/items
  app.get("*", (req, res) => {
    //this loads the index.html file
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
