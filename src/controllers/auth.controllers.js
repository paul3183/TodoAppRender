const jwt = require('jsonwebtoken');
const AuthService = require('../services/auth.services');
require('dotenv').config();

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body; //la peticion desde el body: lo hace el frontend, nosotros damos el servivio al frontend
    const response = await AuthService.login(email, password);
    if (response.isValid) { //si es valido verifica las 3 siguientes lineas:
      const data = {
        email: response.result.email,
        username: response.result.username, //va verificar el email, ussuario, id
        id: response.result.id,
      }
      // firmamos un nuevo token:
      const token = jwt.sign(data, process.env.JWT_SECRET, { algorithm: "HS512", expiresIn: "1m" }); // HS512 ALGORITMO USADO, ES EL TAMAÑO DEL TOKEN GENERADO
      data.token = token; //agregas el token
      console.log(data);
      res.json(data); //respuesta
    } else {
      res.status(401).json({ message: "Credenciales invalidas" })
    }
    // res.json(result);
  } catch (error) {
    res.status(400).json(error.message) //si el estado de la respuesta es mala kiero que me imprimas en formato json  el erroren un mensaje
  }
}

module.exports = {
  userLogin,
};