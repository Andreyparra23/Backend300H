    //coleccion para ordenes
    import mongoose  from "mongoose";

    const orderScheme = new mongoose.Schema({

        product: [{type: mongoose.Schema.Types.ObjectId, ref:"product",required: true}],//id del producto//[]arreglo de datos
        user: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},//id usuario
        orderDate:{type: Date, default:Date.now},//fecha de la orden
        orderTotal: {type: Number, required: true}

    });

    export const orderModel = mongoose.model("order", orderScheme);//link de exportacion

