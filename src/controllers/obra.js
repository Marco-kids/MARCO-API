//import { Obra } from "../models/obra.js";
//import "dotenv/config";
require("dotenv").config();
const obra = require("../models/obra.js");

let ctr = {};

ctr.getAllObras = () => async (req, res) => {
    try {
        obra
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    } catch (err) {
      return res.status(500).json(err);
    }
};

// create obra
ctr.createNewObra = () => async (req, res) => {
    console.log(req.body)
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.json("Empty fields")
        return
    }
    try {
        const {nombre, autor, descripcion, modelo, longitud, latitud} = req.body

        const newEvent = obra({
            nombre: nombre,
            autor: autor,
            descripcion: descripcion,
            modelo: modelo,
            longitud: longitud,
            latitud: latitud
        })

        newEvent.save()
        .then(res.json("success"))
    } catch {
        res.json("Error")
    }
};
  
// get a obras
ctr.getObra = () => async (req, res) => {
    obra
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

// delete a obras
ctr.deleteObra = () => async (req, res) => {
    obra
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

// update a obras
ctr.updateObra = () => async (req, res) => {
    obra
    .updateOne({ _id: id }, { $set: { name } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = ctr;