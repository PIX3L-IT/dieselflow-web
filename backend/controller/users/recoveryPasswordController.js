require("dotenv").config();
const ejs = require('ejs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailer = require('../../utils/nodemailer.js');
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

exports.getConfirmEmail = (req, res, next) => {
    res.render("users/confirmEmail");
};

exports.postConfirmEmail = async (req, res, next) => {
    const email = req.body.email;
    try {
        // Hacerlo desde el front
        if (!email) {
            console.log("Se requiere un correo electrónico");
        }
        const user = await User.findOne({ email }).populate('idRole').exec();

        if (user && user.idRole.roleName === 'Administrador') {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            const resetPasswordLink = `${process.env.ENVIRONMENT_URL}/users/reset-password/?token=${token}`; 

            const templatePath = path.join(__dirname, '../../../frontend-web/views/users/email.ejs');
            const templateData = {
                user: user,
                link: resetPasswordLink,
            };

            const html = await ejs.renderFile(templatePath, templateData);
            const subject = "Recuperación de contraseña";
            mailer.sendEmail(html, email, subject);
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
    }
};

exports.getResetPassword = (req, res, next) => {
    const token = req.query.token;
    res.render("users/resetPassword", { 
        token: token,
    });
};

exports.postResetPassword = async (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // Verificar el token JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token JWT:', err);
            // response.redirect('/auth/login');
        } else {
            // Token válido, proceder con la actualización de la contraseña
            try {
                if (password === confirmPassword) {
                    const email = decoded.email;
                    console.log("Email decodificado:", email);
                    // Verificar si el usuario existe
                    const user = await User.findOne({ email }).populate('idRole').exec();
                    if (user) {
                        const hashed = await bcrypt.hash(password, 10);
                        const updatedUser = await User.findOneAndUpdate(
                            { email },
                            { password: hashed },
                            { new: true }
                        );
                    
                        if (!updatedUser) {
                            return res.status(404).json({ message: 'Usuario no encontrado' });
                        }
                        res.status(200).json({ message: 'Contraseña actualizada correctamente', user: updatedUser });   
                    } else {
                        return res.status(404).json({ message: 'Usuario no encontrado' });
                    }
                } else {
                    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
                }
                
            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
                res.status(500).json({ message: 'Error del servidor' });
            }
        }
    });
};
