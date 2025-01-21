import { productModel } from "../models/model_licores.js";


//---------------------------------------------------------POST
export const postProduct = async (request, response) => {


    try {
        const newProduct = await productModel.create(request.body);
        return response.status(201).json({
            mensaje: 'el producto se creo satisfactoriamente',
            datos: newProduct
        });


    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrio un error al crear el producto',
            problem: error || error.message

        });
    }
}


//---------------------------------------------GET


export const getProduct = async (request, response) => {
    try {
        //metodo fin nos muerstra todo lo que encuentra en la base de datos 
        let products = await productModel.find()
        //podemos agregar validaciones
        //que pasa si no hay nada en la base de datos
        if (products.length === 0) {
            return response.status(200).json({
                mensaje: 'no se encuentraron productos en la base de datos'
            });
        }
        // si si tiene productos para mostrar:
        return response.status(200).json({
            mensaje: 'estos son todos los productos encontrados',
            datos: products
        });


    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrio un error al buscar el producto',
            problem: error || error.message
        });


    }


}

//----------------------------------------------------PUT


export const putProductById = async (request, response) => {
    try {
        let idForPut = request.params.ID; //parametro id que queremos actualizar
        let dataForUpdate = request.body; //paramaetro, informacion con la que se quiere actualizar

        const productUpdated = await productModel.findByIdAndUpdate(idForPut, dataForUpdate);

        //validacion para cuando el id no es correcto o no existe
        if (!productUpdated) {
            return response.status(404).json({
                mensaje: "lo siento, no se encontro el producto para actualizar"
            })
        }


        return response.status(200).json({
            mensaje: 'el producto se actualizo correctamente',
            datos: productUpdated

        });

    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrio un error al actualizar producto',
            problem: error || error.message
        });
    }

}

//-------------------------------------------------------------------------------DELETE
export const deleteProductById = async (request, response) => {
    try {
        let idForDelete = request.params.ID;
        //lo que se elimina no se tiene que guardar en una variable 
        await productModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            mensaje: 'producto eliminado satisfactoriamente'
        })

    } catch (error) {
        return response.status(400).json({
            mensaje: 'ocurrio un error al eliminar producto',
            problem: error || error.message
        });

    }

}




  
