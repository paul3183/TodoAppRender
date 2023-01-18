// importamos express:
const express = require('express');
const db = require("./utils/database");
const initModels = require('./models/init.model');
const Users = require('./models/users.model');
const Todos = require('./models/todos.model');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

console.log(process.env.PORT);

const userRoutes = require('./routes/users.routes')
const todosRoutes = require('./routes/todos.routes');
//crear una instancia de express:
const app = express();

app.use(express.json()) //MEFALTA
app.use(cors());

const PORT = process.env.PORT;

//probando la conexion ala base de datos
db.authenticate()
  .then(() => console.log('autenticacion exitosa'))
  .catch((error) => console.log(error));

initModels();
// vamos a usar el metodo sync de nuestra db
db.sync({ force: false }) // devuelve una promesa
  .then(() => console.log('Base de datos sincronizada'))
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenido al servidor' })
});

app.use('/api/v1', userRoutes); //para escuchar cualquier routes
app.use('/api/v1', todosRoutes);

app.use('/api/v1', authRoutes);

//definir las rutas de nuestros endpoints (ep)
// todas las consultas de usuarios
// localhost:8000/users --> todo para usuarios
//localhost:8000/todos --> todo para tareas

// GET  a /Users:
app.get('/users', async (req, res) => {
  try {
    //vamos a obtener el resultado de consultar a todos los usuarios de la DB
    const result = await Users.findAll(); //SELECT * FROM users;
    res.status(200).json(result); //imprimir en el localhost 
  } catch (error) {
    console.log(error);
  }
});

//Obtener un usuario sabiendo su id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
});

//Obetenr un uausario por username:
app.get("/users/username/:username", async (req, res) => { //los 2 puntos es para un parametro
  try {
    const { username } = req.params;
    const result = await Users.findOne({ where: { username: username } }); //SELECT * from users WHERE username = ianacus
    res.status(200).json(result); //el estado de la respuesta una vez que sea 200, lo imprima en formato json
  }
  catch (error) {
    console.log(error);
  }
});

// creando un usuario:
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const result = Users.create(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
})

// actualizar un usuario, solo podemos cambiar password:
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; //{id:2}
    const field = req.body;
    const result = Users.update(field, {
      where: { id: id }
    });
    res.status(200).json(result);
  }
  catch (error) {
    res.status(400).json(error.message);
  }
});

//eliminar:
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.destroy({
      where: { id: id },
    });
    res.status(200).json(result);
    //validar que el usuario no tenga tareas
    // si tiene tareas responder "nose puede"
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en el Puerto ${PORT}`);
});


app.get('/todos', async (req, res) => {
  try {
    const result = await Todos.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; //identificador el id
    const result = await Todos.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

app.post('/todos', async (req, res) => {
  try {
    const task = req.body;
    const result = await Todos.create(task);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    // console.log(error);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const saveTask = req.body; // es el browser el navegador 
    const { id } = req.params; // sacamos el id para obetener l tarea a modificar, atraves delasolicitud con su parametro q es el id
    const result = await Todos.update(saveTask, { where: { id: id } });  //select * from where id = result.id
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
    // console.log(error);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;  // const id = req.params.id;
    const result = await Todos.destroy({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});



// Vamos a insertar informacion en nuestra base de datos
// desde nuestro proyecto de node

// Consultar la informacion con endPoints

//delete
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Users.destroy({
//       where: { id },
//     });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });

//otros:

// app.post("/users", async (req, res) => {
//   try {
//     const user = req.body;
//     const result = await Users.create(user);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json(error.message);
//     console.log(error);
//   }
// });

// actualizar un usuario, solo podemos cambiar password
// app.put("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params; // { id: 2 }
//     const field = req.body;
//     const result = Users.update(field, {
//       where: { id },
//     });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });
