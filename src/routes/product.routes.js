
import { getProduct, postProduct, deleteProductById, putProductById, } from "../controllers/product.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

export const productRouter = express.Router();

//RUTA GET
productRouter.get('/obtener', getProduct);

//RUTA POST
productRouter.post('/crear',auth("administrador"), postProduct);


//RUTA PUT
productRouter.put('/actualizar/:ID',auth("administrador"), putProductById);

//RUTA DELETE
productRouter.delete('/eliminar/:ID',auth("administrador"),deleteProductById);

