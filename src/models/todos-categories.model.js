const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Todos = require("./todos.model");
const Categories = require("./categories.model");

const TodosCategories = db.define("todos_categories", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  todoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "todo_id",
    references: {
      model: Todos, //se autoexporta arriba para vincular tblas
      key: "id",
    },
  },
  categorieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "categorie_id",
    references: {
      model: Categories, // se exporto es para vincular la tb
      key: "id",
    }
  }
},
  {
    timestamps: false,
  }
);

module.exports = TodosCategories;
