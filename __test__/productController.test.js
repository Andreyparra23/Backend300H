
import app from "../app.js"; 
import mongoose from "mongoose";
import { productModel } from "../src/models/model_licores.js";
import supertest from "supertest";



// Corrección en las expectativas de las pruebas
describe("Pruebas de los controladores de productos POST, GET, PUT, DELETE", () => {
  
  beforeEach(async () => {
    await productModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const productData = {
    
      Image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/135578560_02/w=800,h=800,fit=pad",
      name: "andreyluisa",
      category: "ron",
      price: 32000,
      description: "prueba"
      
  }
  


  // Prueba POST  producto
  it("debería crear un producto correctamente", async () => { 

    const res = await supertest(app).post("/productos/crear").send(productData);
    

    expect(res.statusCode).toBe(201); // Ajustado según el middleware de autenticación
    expect(res.body).toHaveProperty("mensaje", "el producto se creo satisfactoriamente");
  
  });


 

  // Prueba para GET productos
  it("debería devolver una lista de productos", async () => {
    const res = await supertest(app).get("/productos/obtener");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", 'no se encuentraron productos en la base de datos');
  });




  // Prueba para actualizar un producto
  it("debería actualizar un producto correctamente", async () => {
    const updatedProduct = await new productModel(productData).save();
    const productTest = {
    
      Image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/135578560_02/w=800,h=800,fit=pad",
      name: "actualizado",
      category: "ron",
      price: 32000,
      description: "prueba"
      
  }
    const res = await supertest(app).put(`/productos/actualizar/${updatedProduct._id}`).send(productTest);
    
    // Código de estado ajustado a 404 si no se encuentra el producto
    expect(res.statusCode).toBe(200); 
    expect(res.body).toHaveProperty('mensaje', 'el producto se actualizo correctamente');
  });


   

  // Prueba para eliminar un producto

    it("deberia indicar que se elimino un producto", async () => {
      let productDelete = await new productModel(productData).save();
      
      const res = await supertest(app).delete("/productos/eliminar/"+ productDelete._id);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("mensaje", 'producto eliminado satisfactoriamente');
  
    });
  });