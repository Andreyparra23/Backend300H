import { orderModel } from "../models/orderModel.js";


//-----------------Peticion POST-------------------------

export const postOrder = async (request, response) => {

  try {

    const newOrder = await orderModel.create(request.body);

    return response.status(201).json({
      mensaje: "Orden creada sactifactoriamente",
      datos: newOrder
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: " ocurrio un error al crear la orden",
      error: error || error.message
    });
  }
}


//-----------------Peticion GET-------------------------
export const getOrder = async (request, response) => {

  try {

    let Orders = await orderModel.find();

    if (Orders.length === 0) {
      return response.status(200).json({
        mensaje: "no se encontraron ordenes en la base de datos"
      });
    }
    return response.status(200).json({
      mensaje: " estos son todos las ordenes encontradas",
      datos: Orders
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: " ocurrio un error al buscar las ordenes",
      error: error.message || error
    });
  }
}


//-----------------Peticion DELETE-------------------------
export const deleteOrderById = async (request, response) => {

  try {
    let idForDelete = request.params.id;
    await orderModel.findByIdAndDelete(idForDelete);
    return response.status(200).json({
      mensaje: " orden eliminada correctamente"
    });

  } catch (error) {
    return response.status(400).json({
      mesaje: " ocurrio un error al eliminar la orden",
      error: error || error.message
    });
  }

}
