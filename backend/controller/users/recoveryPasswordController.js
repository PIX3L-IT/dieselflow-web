require("dotenv").config();
const ejs = require('ejs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailer = require('../../utils/nodemailer.js');
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");
const { error } = require("console");

exports.getConfirmEmail = (req, res, next) => {
    res.render("users/confirmEmail");
};

exports.postConfirmEmail = async (req, res, next) => {
    const email = req.body.email;

    if (email === "") {
        console.error("El correo no puede estar vacío");
        return res.status(400).json({
            error: "Se requiere un correo electrónico",
        });
    }

    try {
        const user = await User.findOne({ email }).populate('idRole').exec();
        if (!user) {
            console.error("El correo electrónico no está registrado");
            return res.status(404).json({
                error: "No se pudo completar la solicitud",
            });
        }

        if (user.idRole.roleName !== 'Administrador') {
            console.error("El usuario no tiene permisos de administrador");
            return res.status(403).json({
                error: "No se pudo completar la solicitud",
            });
        }

        const token = jwt.sign(
            { email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        const resetPasswordLink = `${process.env.ENVIRONMENT_URL}/usuarios/restablecer-contrasenia/?token=${token}`; 

        const templatePath = path.join(
            __dirname, 
            '../../../frontend-web/views/users/email.ejs'
        );
        const templateData = {
            user: user,
            link: resetPasswordLink,
        };

        const html = await ejs.renderFile(templatePath, templateData);
        const subject = "Recuperación de contraseña";

        try {
            await mailer.sendEmail(html, email, subject);
            return res.status(200).json({
                message: "Correo enviado correctamente",
            });
        } catch (error) {
            return res.status(500).json({
                error: "Error al enviar el correo",
            });
        }
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).render("users/confirmEmail", {
            error: "No se pudo completar la solicitud",
        });
    }
};

exports.getResetPassword = (req, res, next) => {
    const token = req.query.token;

    if (!token) {
        console.error('Token no proporcionado');
        return res.render("users/login", {
            error: "Token no proporcionado",
        });
    }
    
    // Verificar el token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token JWT:', err);
            return res.render("users/login", {
                error: 'Token inválido o expirado',
            });
        } else {
            return res.render("users/resetPassword", { 
                token: token,
                error: "",
            });
        }
    });
};

exports.postResetPassword = async (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const type = req.body.type;

    if (password === "" || confirmPassword === "") {
        const error = "Se requiere una contraseña";
        console.error(error);
        if (type === "Administrador"){
            return res.render("users/resetPassword", {
                token: token,
                error: error,
            });
        }
        return res.status(400).json({ error });
    }

    if (password !== confirmPassword) {
        const error = "Las contraseñas no coinciden";
        console.error(error);
        if (type === "Administrador"){
            return res.render("users/resetPassword", {
                token: token,
                error: error,
            });
        }
        return res.status(400).json({ error });
    }

    // Verificar el token JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token JWT:', err);
            if (type === "Administrador"){
                return res.render("users/login", {
                    error: "No se pudo completar la solicitud",
                });
            }
            return res.status(401).json({
                error: 'Token inválido o expirado',
            });
        } else {
            // Token válido, proceder con la actualización de la contraseña
            try {
                const email = decoded.email;
                // Verificar si el usuario existe
                const user = await User.findOne({ email }).populate('idRole').exec();
                
                if (!user) {
                    const error = "Usuario no encontrado";
                    console.error(error);
                    if (type === "Administrador"){
                        return res.render("users/resetPassword", {
                            token: token,
                            error: error,
                        });
                    }
                    return res.status(404).json({ error });
                }
            
                const hashed = await bcrypt.hash(password, 10);
                const updatedUser = await User.findOneAndUpdate(
                    { email },
                    { password: hashed },
                    { new: true }
                );
                
                if (!updatedUser) {
                    const error = "Usuario no encontrado";
                    console.error(error);
                    if (type === "Administrador"){
                        return res.render("users/resetPassword", {
                            token: token,
                            error: error,
                        });
                    }
                    return res.status(404).json({ error });
                }

                const msg = "Contraseña actualizada correctamente";
                if (type === "Administrador"){
                    return res.render("users/login", {
                        error: "",
                        msg: msg,
                    });
                }
                return res.status(200).json({ msg });

            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
                return res.status(500).json({
                    message: 'Error del servidor',
                });
            }
        }
    });
};
