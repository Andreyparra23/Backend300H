import { getOrder, postOrder, deleteOrderById } from "../controllers/order.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

export const orderRouter = express.Router();

//RUTA GET
orderRouter.get('/obtener',auth(), getOrder);

//RUTA POST
orderRouter.post('/crear', postOrder);

//RUTA DELETE
orderRouter.delete('/eliminar/:id', auth(),deleteOrderById);