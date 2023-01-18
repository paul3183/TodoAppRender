const jwt = require('jsonwebtoken');
//el middleware se puede decir que ocurre entre req y res.
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  let { authorization: token } = req.headers;
  token = token.replace('Bearer ', '');
  // token = token.split(' ')[1];
  // const token = req.headers;
  console.log(token);
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    { algorithms: "HS512" },
    (err, decoded) => {
      if (err) {
        res.status(400).json({
          error: 'invalid token',
          message: 'El token no es valido, envia un token correcto'
        });
      } else {
        console.log(decoded);
        next();
      }
    }
  );

  // next();
}
module.exports = authMiddleware;

// vamos a validar el token

// si el token el valido
// lo dejamos pasar a la ruta

// si es invalido
// repondemos anda pasha