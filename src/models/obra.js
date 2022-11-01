import { Schema, model } from "mongoose";

const obraSchema = new Schema({
    nombre: {
        type: String,
        //required: true
    },
    autor: {
        type: String,
        //required: true
    },
    descripcion: {
        type: String,
        //required: true
    },
    modelo: {
        type: String,
        //required: true
    },
    longitud: {
        type: String,
        //required: true
    },
    latitud: {
        type: String,
        //required: true
    },
});

export default model('obras', obraSchema);