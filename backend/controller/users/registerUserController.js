/*
  Función que registra un nuevo usuario en la base de datos.

  Parámetros:
  - Object req: contiene el body con los datos del usuario
  - Object res: objeto para responder al frontend

  Valor de Retorno:
  - JSON con mensaje de éxito o error
*/

const bcrypt = require("bcrypt");
const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

const registerUser = async (req, res) => {
  try {
    const {
      username,
      lastName,
      email,
      password,
      confirmPassword,
      roleName,
      accessCode,   
    } = req.body;

    // 1) Validación de campos obligatorios (excepto accessCode para administradores)
    if (!username || !lastName || !email || !password || !confirmPassword || !roleName) {
      return res
        .status(400)
        .json({ message: "Todos los campos (menos código para admin) son obligatorios" });
    }

    // 2) Contraseñas
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    // 3) Rol válido
    const role = await Role.findByRoleName(roleName.trim());
    if (!role) {
      return res.status(400).json({ message: "Rol no válido" });
    }

    // 4) Para CONDUCTOR, el código es OBLIGATORIO
    if (roleName === "Conductor" && !accessCode) {
      return res
        .status(400)
        .json({ message: "El campo código es obligatorio para conductores" });
    }

    // 5) Usuario existente
    const existingUser = await User.findByEmailRegister(email);
    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    // 6) Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7) Asignar accessCode: viene del front
    const finalCode = accessCode || null;

    // 8) Crear usuario
    await User.createUser({
      idRole: role._id,
      username,
      lastName,
      email,
      password: hashedPassword,
      registrationDate: new Date(),
      userStatus: true,
      accessCode: finalCode,
    });

    res.status(200).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { registerUser };