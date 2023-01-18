//vamos a importar todos nuestros modelos creados
const Users = require('./users.model');
const Todos = require('./todos.model');
const TodosCategories = require('./todos-categories.model');
const Categories = require('./categories.model');

const initModels = () => {
  // Users;
  // // Todos;
  // // TodosCategories;
  // Categories;
  //vamos a crear las relaciones

  Todos.belongsTo(Users, { as: "users", foreignKey: "user_id" });
  Users.hasMany(Todos, { as: "task", foreignKey: "user_id" });
  //
  Todos.hasMany(TodosCategories, { as: "categories", foreignKey: "todo_id" });
  TodosCategories.belongsTo(Todos, { as: "task", foreignKey: "todo_id" });
  //
  TodosCategories.belongsTo(Categories, { as: "categories", foreignKey: "categorie_id" });
  Categories.hasMany(TodosCategories, { as: "tasks", foreignKey: "categorie_id" });

  //users con categorires:
  Users.hasMany(Categories, { as: "categories", foreignKey: "user_id" });
  Categories.belongsTo(Users, { as: "users", foreignKey: "user_id" });
}


module.exports = initModels;
