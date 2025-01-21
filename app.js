import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import { productRouter } from "./src/routes/product.routes.js";
import { orderRouter } from "./src/routes/order.routes.js";
import { usersRouter } from "./src/routes/user.routes.js";
import loginRouter from "./src/routes/login.routes.js";
import cors from 'cors';


const app = express();
dotenv.config();
connectionMongo ();
app.use (cors());


app.use(express.json()); 
app.use('/productos', productRouter);
app.use("/ordenes", orderRouter);
app.use('/usuarios', usersRouter);
app.use('/iniciarSesion', loginRouter);




export default app;