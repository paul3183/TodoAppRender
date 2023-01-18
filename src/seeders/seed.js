const db = require('../utils/database');
const Users = require('../models/users.model');
const Todos = require('../models/todos.model');
const Categories = require('../models/categories.model');
const TodosCategories = require('../models/todos-categories.model');

const users = [
  { username: "Iannacus", email: 'ian@gmail.com', password: '1234' },//id 1

  { username: "Jhorman", email: 'jhorman@gmail.com', password: '1234' },// id2

  { username: "lucero", email: 'lucero@gmail.com', password: '1234' } // id3
];

const todos = [
  {
    title: 'Estudiar Node',
    description: 'shalashalal',
    userId: 1
  },

  {
    title: 'Pasear al perro',
    description: 'shalashalal 2',
    userId: 1
  },

  {
    title: 'lavar platos',
    userId: 2
  },
  {
    title: 'ir al chequeo mensual',
    description: 'porque node no me deja',
    userId: 3
  },
];

const categories = [
  { name: 'personal', userId: 1 },
  { name: 'educacion', userId: 2 },
  { name: 'salud', userId: 1 },
  { name: 'trabajo', userId: 2 },
  { name: 'hogar', userId: 3 },
  { name: 'cocina', userId: 3 },
  { name: 'deporte', userId: 3 },
  { name: 'ocio', userId: 2 },
  { name: 'financiero', userId: 3 },
  { name: 'entretenimiento', userId: 3 },
];

const todosCategories = [
  { categorieId: 1, todoId: 1 },
  { categorieId: 2, todoId: 1 },
  { categorieId: 4, todoId: 1 },
  { categorieId: 1, todoId: 2 },
  { categorieId: 7, todoId: 2 },
  { categorieId: 10, todoId: 2 },
  { categorieId: 3, todoId: 2 },
  { categorieId: 5, todoId: 3 },
  { categorieId: 6, todoId: 3 },
  { categorieId: 1, todoId: 4 },
  { categorieId: 3, todoId: 4 },
];

// create 
// findOne, findAll, findByPk
// update
// destroy

db.sync({ force: true }) //los arreglos que he creado no se eliminen.
  .then(() => {
    console.log('Iniciando con el sembrado malicioso');
    users.forEach((user) => Users.create(user));

    setTimeout(() => {
      todos.forEach((todo) => Todos.create(todo));
    }, 100);
    setTimeout(() => {
      categories.forEach((category) => Categories.create(category));
    }, 250);
    setTimeout(() => {
      todosCategories.forEach((tc) => TodosCategories.create(tc));
    }, 400);
  })
  .catch((error) => console.log(error));