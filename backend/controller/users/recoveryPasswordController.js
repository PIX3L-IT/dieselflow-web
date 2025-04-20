require("dotenv").config();
const ejs = require('ejs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailer = require('../../utils/nodemailer.js');
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");
const { error } = require("console");

/*
  Descripción sobre la función:
  Renderiza la vista para confirmar el correo electrónico.

  Parámetros:
  - req (Object): Objeto de solicitud HTTP.
  - res (Object): Objeto de respuesta HTTP.
  - next (Function): Función para pasar al siguiente middleware.

  Valor de Retorno:
  - Render: Carga de la vista "users/confirmEmail".
*/
exports.getConfirmEmail = (req, res, next) => {
    return res.render("users/confirmEmail");
};

/*
  Descripción sobre la función:
  Maneja la solicitud para confirmar el correo electrónico y 
  envía un correo con un enlace para restablecer la contraseña.

  Parámetros:
  - req (Object): Objeto de solicitud HTTP que contiene el correo electrónico en el cuerpo.
  - res (Object): Objeto de respuesta HTTP.
  - next (Function): Función para pasar al siguiente middleware.

  Valor de Retorno:
  - JSON: Mensaje de éxito o error.
*/
exports.postConfirmEmail = async (req, res, next) => {
    const email = req.body.email;

    // Validar que el correo electrónico no esté vacío
    if (email === "") {
        const error = "Se requiere un correo electrónico";
        console.error(error);
        return res.status(400).json({ error });
    }

    try {
        const user = await User.findOne({ email }).populate('idRole').exec();
        // Verificar si el usuario existe
        if (!user) {
            const error = "El correo electrónico no está registrado";
            console.error(error);
            return res.status(404).json({ error });
        }

        // Verificar si el usuario tiene el rol de administrador
        if (user.idRole.roleName !== 'Administrador') {
            const error = "No se pudo completar la solicitud";
            console.error("El usuario no tiene permisos de administrador");
            return res.status(403).json({ error });
        }

        // Crear un token JWT con el correo del usuario
        const token = jwt.sign(
            { email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        const resetPasswordLink = `${process.env.ENVIRONMENT_URL}/usuarios/restablecer-contrasenia/?token=${token}`; 

        // Cargar la plantilla de correo electrónico
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

        // Enviar el correo electrónico
        try {
            const emailStatus = await mailer.sendEmail(html, email, subject);
            if (emailStatus.success) {
                const message = "Correo enviado correctamente";
                console.log(message);
                return res.status(200).json({ message });
            }
        } catch (error) {
            // Manejo de errores al enviar el correo
            const errorMessage = "Error al enviar el correo";
            console.error(errorMessage, error);
            return res.status(500).json({ errorMessage });
        }
    } catch (error) {
        // Manejo de errores en caso de que la consulta falle
        const errorMessage = "Error en el servidor";
        console.error(errorMessage, error);
        return res.status(500).render("users/confirmEmail", {
            error: "No se pudo completar la solicitud",
        });
    }
};

/*
  Descripción sobre la función:
  Renderiza la vista para restablecer la contraseña si el token es válido.

  Parámetros:
  - req (Object): Objeto de solicitud HTTP que contiene el token en la query.
  - res (Object): Objeto de respuesta HTTP.
  - next (Function): Función para pasar al siguiente middleware.

  Valor de Retorno:
  - Render: Carga de la vista "users/resetPassword" o "users/login".
*/
exports.getResetPassword = (req, res, next) => {
    const token = req.query.token;

    // Validar que el token no esté vacío
    if (!token) {
        const error = "Token no proporcionado";
        console.error(error);
        return res.render("users/login", {
            error: error,
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

/*
  Descripción sobre la función:
  Maneja la solicitud para restablecer la contraseña de un usuario.

  Parámetros:
  - req (Object): Objeto de solicitud HTTP que contiene el token, la nueva contraseña y la confirmación de la contraseña.
  - res (Object): Objeto de respuesta HTTP.
  - next (Function): Función para pasar al siguiente middleware.

  Valor de Retorno:
  - JSON o Render: Mensaje de éxito o error.
*/
exports.postResetPassword = async (req, res, next) => {
    // Variables 
    const token = req.body.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const type = req.body.type;

    // Validar que la contraseña y la confirmación no estén vacías
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

    // Validar que la contraseña y la confirmación sean iguales
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
            // Token válido, proceder a restablecer la contraseña
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
                
                // Verificar si el usuario tiene el rol de administrador
                if (user.idRole.roleName !== 'Administrador') {
                    const error = "No se pudo completar la solicitud";
                    console.error("El usuario no tiene permisos de administrador");
                    if (type === "Administrador"){
                        return res.render("users/resetPassword", {
                            token: token,
                            error: error,
                        });
                    }
                    return res.status(403).json({ error });
                }

                // Hashear la nueva contraseña
                const hashed = await bcrypt.hash(password, 10);
                const updatedUser = await User.findOneAndUpdate(
                    { email },
                    { password: hashed },
                    { new: true }
                );
                
                // Verificar si la actualización fue exitosa
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

                // Enviar respuesta de éxito
                const msg = "Contraseña actualizada correctamente";
                if (type === "Administrador"){
                    return res.render("users/login", {
                        error: "",
                        msg: msg,
                    });
                }
                return res.status(200).json({ msg });
            } catch (error) {
                // Manejo de errores en caso de que la actualización falle
                console.error('Error al actualizar la contraseña:', error);
                return res.status(500).json({
                    message: 'Error del servidor',
                });
            }
        }
    });
};
