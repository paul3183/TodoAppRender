const { Router } = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserWithTodos, getUserWithCategories } = require('../controllers/users.controller');
const authMiddleware = require('../middlwares/auth.middleware');

const router = Router();

// app.get
// app.post
// app.put
// app.delete

//localhost:8000/users
//controlador
router.get('/users', authMiddleware, getAllUsers); //primer parametro es la ruta y el segundo es la funcion
// (req, res) => {
//   res.json({ message: 'Obteniendo todos los usuarios' });
// }
router.get('/users/:id', authMiddleware, getUserById);

//OBTENER A un usuario con sus tareas:
// router.get('/users/:id/tasks', getUserWithTasks);

router.post('/users', createUser);
// (req, res) => {
//   res.json({ message: 'Creando un nuevo usuario' });
// }

router.put('/users/:id', authMiddleware, updateUser);
// (req, res) => {
//   res.json({ message: 'Actualizando un usuario' });
// }

router.delete('/users/:id', authMiddleware, deleteUser);
// (req, res) => {
//   res.json({ message: 'Eliminando un usuario' });
// }

router.get('/users/:id/todos', authMiddleware, getUserWithTodos);

//creando la ruta para traer los ususarios:
router.get('/users/:id/categories', getUserWithCategories);

module.exports = router;
// export default router;