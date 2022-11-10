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
    longitud: {
        type: String,
        //required: true
    },
    latitud: {
        type: String,
        //required: true
    },
});

obraSchema.methods.changedModelToURL = function() {
    return process.env.IP_PC + this.modelo;
};

module.exports = mongoose.model('Obra', obraSchema);