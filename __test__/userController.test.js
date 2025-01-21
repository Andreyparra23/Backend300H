//1. importamos dependencias, modulos y funciones que vayamos a usar

import supertest from "supertest"; //permite probar controladores get, put,delete, etc
import app from "../app.js"; //permite probar conexion con DB y rutas
import mongoose from "mongoose";
import { userModel } from "../src/models/usuariosModel.js";

//2. definir los bloques de prueba

describe("pruebas de los controladores de usuarios", () => {
  //este será para limpiar la base de datos antes de cada prueba
  //los corchetes dentro de parentesis significa "todo"
  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  //cerrar conexion con la base de datos despues de todas las pruebas
  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser = {
    fullname: "andrey el admin",
      email:  "andreyadmin@gmail.com",
      password: "admin123",
      typeDocument: "CC",
      numberDocument: "11234556"
  
  };

  //------------------POST

  describe("pruebas POST /users", () => {
    //primer caso de prueba: creación de usuarios
    it("deberia crear un usuario correctamente", async () => {
      const res = await supertest(app).post("/usuarios/crear").send(testUser);
      expect(res.statusCode).toBe(201);
    });

    //segundo caso de prueba: error si falta un campo obligatorio
    it("deberia devolver un error si falta un campo obligatorio", async () => {
      const res = await supertest(app)
        .post("/usuarios/crear")
        .send({ email: testUser.email });
      expect(res.body).toHaveProperty(
        "mensaje",
        "Ocurrio un error al crear un usuario"
      );
    });
  });

  //--------------------------------GET

  describe("pruebas GET /users", () => {
    it("deberia mostrar usuarios almacenados", async () => {
      const res = await supertest(app).get("/usuarios/obtener");
      expect(res.statusCode).toBe(200);

      //IMPORTANTE falta caso 2 donde no hay usuarios almacenados

      expect(res.body).toHaveProperty("mensaje", "No hay usuarios almacenados");
    });
  }); 


  //--------------------DELETE

  describe("puebas DELETE /users", () => {
    it("deberia indicar que se elimino un usuario", async () => {
      let userDelete = await new userModel(testUser).save();
      
      const res = await supertest(app).delete("/usuarios/borrar/"+ userDelete._id);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("mensaje", "usuario eliminado satisfactoriamente");
  
    });
  });
}); 
