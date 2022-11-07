//import { Obra } from "../models/obra.js";
//import "dotenv/config";
require("dotenv").config();
const Obra = require("../models/obra.js");

let ctr = {};

ctr.getAllObras = () => async (req, res) => {
    try {
        Obra
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    } catch (err) {
      return res.status(500).json(err);
    }
};

// create obra
ctr.createNewObra = () => async (req, res) => {
    Obra
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    res.send("Creacion de obra");
};
  
  
// get a obras
ctr.getObra = () => async (req, res) => {
    Obra
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

// delete a obras
ctr.deleteObra = () => async (req, res) => {
    Obra
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

// update a obras
ctr.updateObra = () => async (req, res) => {
    Obra
    .updateOne({ _id: id }, { $set: { name } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = ctr;