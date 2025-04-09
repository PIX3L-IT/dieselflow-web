const { render } = require('ejs');
const mailer = require('../../../frontend-web/utils/nodemailer.js');

exports.get_sendEmail = (req, res) => {
    render('testing/sendEmail.ejs', {
    });
};

exports.post_sendEmail = (req, res) => {
    const email = 'a01710217@tec.mx';
    const message = 'Este es un mensaje de prueba';
    const subject = 'Prueba de envío de correo electrónico';
  
    // Llamar la función para enviar el correo electrónico
    mailer.enviar_mail(message, email, subject);
  
    // Enviar una respuesta al cliente
    res.status(200).json({
      message: 'Correo electrónico enviado con éxito',
    });
};
