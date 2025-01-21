
import { createUser, showUsers, deleteUserByID } from '../controllers/user.controller.js';
import express from 'express';
import auth from '../middleware/auth.js';


 export const usersRouter = express.Router();
usersRouter.post('/crear', createUser);
usersRouter.get('/obtener',/*(auth("administrador"),*/ showUsers);
usersRouter.delete('/borrar/:ID',/*auth("administrador"),*/deleteUserByID);
