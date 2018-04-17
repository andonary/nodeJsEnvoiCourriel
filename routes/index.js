const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/askForCookiesRecipe", (req, res, next) => {
  const smtpTransport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0600747db5b854",
      pass: "4f37a10fb1bf96"
    }
  });

  smtpTransport.sendMail(
    {
      from: "John Smith <darkvadordugondor@toto.com>", // Expediteur
      to: "supergrandma@yopmail.com", // Destinataires
      subject: "I AM ERROR", // Sujet
      text: "Hello world ✔ How's life?", // plaintext body
      html: "<b>Hello world ✔ huhu</b>" // html body
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + info.response);
      }
    }
  );

  res.send("Courriel envoyé !");
});

module.exports = router;
