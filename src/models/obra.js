//import { Schema, model } from "mongoose";
const mongoose = require("mongoose");

const obraSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Obra', obraSchema);