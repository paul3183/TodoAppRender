
const Categories = require('../models/categories.model');
const TodosCategories = require('../models/todos-categories.model');
const Todos = require('../models/todos.model');

class TodosServices {
  static async getAll() {
    try {
      const result = await Todos.findAll();
      return result;
    } catch (error) {
      throw error //lanzo el error
    }
  }
  static async getById(id) {
    try {
      const result = await Todos.findByPk(id);
      return result;
    } catch (error) {
      throw error
    }
  }
  static async createTodos(field) {
    try {
      const result = await Todos.create(field);
      return result;
    } catch (error) {
      throw error
    }
  }
  static async updateTodos(field, id) {
    try {
      const result = await Todos.update(field, { where: { id } });
      return result;
    } catch (error) {
      throw error
    }
  }
  static async deleteTodos(id) {
    try {
      const result = await Todos.destroy({ where: { id } })
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getWithCategories(id) {
    try {
      const result = await Todos.findOne({
        where: { id },
        include: {
          model: TodosCategories,
          as: 'categories',
          attributes: ['id'],
          include: {
            model: Categories,
            as: 'categories',
          },
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = TodosServices;