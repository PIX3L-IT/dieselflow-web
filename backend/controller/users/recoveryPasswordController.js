const ejs = require('ejs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('dotenv').config().parsed;
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
            console.log("Usuario encontrado:", user);

            const templatePath = path.join(__dirname, '../../../frontend-web/views/users/email.ejs');
            const templateData = {
                username: user.username
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
    res.render("users/resetPassword");
};

exports.postResetPassword = async (req, res, next) => {
    const email = "benjaminarauzc@gmail.com";
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    try {
        if (password === confirmPassword) {
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
            return res.status(400).json({ message: 'Las contraseñas no coinciden' });
        }
        
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        res.status(500).json({ message: 'Error del servidor' });
    }
    
};
