//import { Schema, model } from "mongoose";
const mongoose = require("mongoose");

const obraSchema = mongoose.Schema({
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
    isActive: {
        type: String,
        //required: true
    },
    zona: {
        type: String,
        //required: true
    },
    latitud: {
        type: String,
        //required: true
    },
    longitud: {
        type: String,
        //required: true
    },
});

module.exports = mongoose.model('Obra', obraSchema);