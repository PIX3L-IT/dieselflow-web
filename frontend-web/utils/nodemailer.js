const nodemailer = require('nodemailer');
const config = require('dotenv').config().parsed;


exports.enviar_mail = (html, email, subject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    // Autentificación del correo que va a enviar los correos
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASSWORD,
    },
  });
	
	// Cofiguración del correo a enviar
  const mailOptions = {
    // De:
    from: config.MAIL_USER,
    // Para:
    to: email,
    // Asunto:
    subject: subject,
    // Contenido del correo:
    html: html,
  };
	
	// Enviar correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('El correo no pudo ser enviado');
      console.log(error);
    } else {
      console.log('El correo fue enviado: ' + info.response);
    }
  });
};
