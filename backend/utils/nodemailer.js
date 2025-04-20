require("dotenv").config();
const nodemailer = require('nodemailer');

/*
    Descripción sobre la función:
    Esta función se encarga de enviar correos electrónicos utilizando el servicio de Gmail.
    Se utiliza la librería nodemailer para facilitar el envío de correos electrónicos.
    
    Parámetros:
    - html: Contenido HTML del correo electrónico.
    - email: Dirección de correo electrónico del destinatario.
    - subject: Asunto del correo electrónico.

    Valor de retorno:
    - Devuelve una promesa que se resuelve si el correo se envía correctamente o se rechaza si ocurre un error.
*/
exports.sendEmail = async (html, email, subject) => {
    return new Promise((resolve, reject) => {
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
            reject({ success: false, message: 'Error al enviar el correo', error });
        } else {
            console.log('El correo fue enviado: ' + info.response);
            resolve({ success: true, message: 'Correo enviado correctamente', info });
        }
        });
    });
};