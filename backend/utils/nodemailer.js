require("dotenv").config();
const nodemailer = require('nodemailer');

exports.sendEmail = async (html, email, subject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        // Autentificación del correo que va a enviar los correos
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
	
    // Cofiguración del correo a enviar
    const mailOptions = {
        // De:
        from: process.env.MAIL_USERNAME,
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
        console.error('El correo no pudo ser enviado');
    } else {
        console.log('El correo fue enviado: ' + info.response);
    }
    });
};