const { Sequelize } = require('sequelize'); // ORM es  
// crear una instancia con parametros de config. de nuestra base de datos:
// un objeto de configuracion  --> credenciales de mi base de datos
require('dotenv').config(); //vamos autilizar variables de entorno

const db = new Sequelize({
  database: process.env.DB_NAME, // "todoapp",
  username: process.env.DB_USER,
  //"postgres",
  host: process.env.DB_HOST, //"localhost",  // 127.0.0.1 es lo mismo que localhost
  port: process.env.DB_PORT, //"5433",
  password: process.env.DB_PASSWORD, //"041213",
  dialect: "postgres", // la base de datos que estamos usando
  logging: false,  //para silenciar el sequilize
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

module.exports = db;
