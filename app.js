const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const nodemailer = require("nodemailer");

//  service gmail set automatically host, port and connection security settings
//   service: "Gmail",
// Sinon :
// host: "smtp.gmail.com",
// port: 587,
// secure: true,
// Merde :
// auth: {
//     user: "wcs199109@gmail.com",
//     pass: "jecode4lyon"
//   }
// Création de la méthode de transport de l'email
// let smtpTransport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "0600747db5b854",
//     pass: "4f37a10fb1bf96"
//   }
// });

// smtpTransport.sendMail(
//   {
//     from: "Ando NARY <ando.nary@gmail.com>", // Expediteur
//     to: "supergrandma@yopmail.com, ando.nary@gmail.com", // Destinataires
//     subject: "Coucou !", // Sujet
//     text: "Hello world ✔ How's life?", // plaintext body
//     html: "<b>Hello world ✔ huhu</b>" // html body
//   },
//   (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Message sent: " + info.response);
//     }
//   }
// );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
