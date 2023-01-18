const Users = require('../models/users.model');

class AuthService {
  static async login(email, password) {
    try {
      const result = await Users.findOne({
        where: { email },  //que me busque la coincidencia en el email
      });
      // PRIMERO VERIFICA EL EMAIL QUE DENTRO DEL OBJETO SE ENCUENTRE EL EMAIL INGESADO, LO BUSCA CON FIND ONE EN LA BASE DE DATOS, QUE ME DEVUEKVA LA PRIMERA COINCIDENCIA
      // SI ES CIERTO RESULT ES TRUE
      if (result) { // ESTE, SINO VAMOS A LA LINEA 15.
        // console.log(password, result.password);
        return password === result.password ? { isValid: true, result } : { isValid: false } //ternario: COMPARA SI LA CONTRASEÑA INGRESADA EN EL TUNDER ES IGUAL, A ESE OBJETO ACCEDO AL PASSWORD Y COMPARO.
      }
      return { isValid: false }; //si no hay resultado tambien es invalido
    } catch (error) {
      throw error;
    }
  }
}
module.exports = AuthService;