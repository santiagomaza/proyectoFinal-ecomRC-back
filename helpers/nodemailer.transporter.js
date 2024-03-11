const nodemailer = require("nodemailer");
const usuarioSMTP = process.env.emailSMTP
const contraseñaSMTP = process.env.claveSMTP

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: usuarioSMTP,
    pass: contraseñaSMTP,
  },
});

module.exports = { transporter };