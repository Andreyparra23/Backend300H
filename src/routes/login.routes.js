// 1. importar dependencias y módulos
// import login from '../services/loginService.js'; -> export defauld
// import { login } from "../services/loginService.js"; -> sólo export

import login from '../services/loginService.js';
import express from 'express';

// 2. configurar nuestro router de express
const loginRouter = express.Router();

//3. crearnos la ruta -> crear un inicio de sesión
// GET -> MOSTRAR -> LEER -> OBTENER
// POST -> CREAR
// PUT -> ACTUALIZAR
// DELETE -> ELIMINAR

loginRouter.post('/', login);

export default loginRouter;

