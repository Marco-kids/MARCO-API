const obra = require("../models/obra.js");
require("dotenv").config();

let ctr = {};

// GET all obras
ctr.getAllObras = () => async (req, res) => {
    try {
        const obras = obra.find(function(err, docs) {
            if (err) {
                res.status(500).json("Error finding obras")
            }
            docs.forEach(function (doc) {
                doc.modelo = process.env.IP_PC + "/api/models/" + doc.modelo
            });
            res.json(docs)
        })
    } catch {
        res.status(500).json("Error finding obras")
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

// GET a obra
ctr.getObra = () => async (req, res) => {
    obra
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

// DELETE a obra
ctr.deleteObra = () => async (req, res) => {
    const {id} = req.body;
    console.log(id);
    obra.deleteOne({ _id: id }).then(function(data) {
        res.json(data)
    }).catch(function(error){
        res.json(error)
    });

};

/*
// update a obras
ctr.updateObra = () => async (req, res) => {
    obra
    .updateOne({ _id: id }, { $set: { name } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};
*/

module.exports = ctr;