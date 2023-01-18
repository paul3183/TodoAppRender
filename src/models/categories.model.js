const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");

const Categories = db.define("categories", {
  id: {
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "user_id",
    references: {
      model: Users,
      key: "id",
    }
  }
},
  {
    timestamps: false,  //para que no cree el createAt updateAt
  });


module.exports = Categories;