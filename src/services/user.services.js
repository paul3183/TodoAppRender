const Users = require('../models/users.model');
const Todos = require('../models/todos.model');
const Categories = require('../models/categories.model');

//clases POO:
class UserServices {
  static async getAll() {
    try {
      const result = await Users.findAll(); //finAll es de sequalize metodo: select* from users con js
      return result; // enviar informacion a users.controllers y lo recibe con res.status
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await Users.findByPk(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserWithTodos(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        include: {
          model: Todos,
          as: "task",
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserWithCategories(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        include: {
          model: Categories,
          as: "categories",
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(user) {
    try {
      const result = await Users.create(user);
      return result;
    }
    catch (error) {
      throw error;
    }
  }

  static async update(field, id) {
    try {
      const result = await Users.update(field, {
        where: { id: id },
      });
      return result
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await Users.destroy({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error
    }
  }
}
module.exports = UserServices;