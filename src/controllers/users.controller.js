const UserServices = require('../services/user.services');

const getAllUsers = async (req, res) => { //lo que hace la funcion
  try {
    const result = await UserServices.getAll(); //le pide a la bd por medio de sequelize
    res.status(200).json(result); // lo recibe con res.status 
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getUserWithTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getUserWithTodos(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getUserWithCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getUserWithCategories(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await UserServices.create(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await UserServices.update(field, id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message)
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserServices.delete(id);
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
}



module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserWithTodos,
  getUserWithCategories,
}