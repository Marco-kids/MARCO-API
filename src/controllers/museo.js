const Museo = require("../models/museo.js");
require("dotenv").config();
const mongoose = require("mongoose");
const obra = require("../models/obra.js");

ctr = {}

// GET all museo
ctr.listMuseo = () => async (req, res) => {
  try {
      const museos = await Museo.find().populate("locations").populate("obras")
      res.status(200).json(museos)
  } catch(error) {
      res.status(500).json({message: error.message})
  }
};

// GET active museo
ctr.getActiveMuseo = () => async (req, res) => {
  try {
      const museo = await Museo.findOne({ isActive: true }).populate("locations").populate("obras")
      res.status(200).json(museo)
  } catch(error) {
      res.status(500).json({message: error.message})
  }
};

// POST museo
ctr.createNewMuseo = () => async (req, res) => {
  try {
    const museo = new Museo({
      nombre: req.body.nombre,
      obras: JSON.parse(req.body.obras),
      locations: JSON.parse(req.body.locations),
      isActive: false,
      imagen: req.image.path
    })

    await museo.save()
    res.status(201).json(museo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PUT updates the active museo
ctr.setActiveMuseo = () => async (req, res) => {
  const id = req.params.id
  try {
    await Museo.updateMany({}, { $set: { isActive: false } }); // set all to false
    await Museo.updateOne({ _id: id }, { $set: { isActive: true } }); // set one to true
    res.status(200).json({message : "Activated"});
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

ctr.deleteMuseo = async (req, res) => {
  const id = req.params.id
  try {
    const museo = await Museo.deleteOne({ _id: id });
    res.status(200).json(museo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

ctr.updateObras = async (req, res) => {
  const id = req.params.id
  const obras = req.body.obras
  try {
    const update = await Museo.updateOne({ _id: id }, { $set: { obras: obras } }); // set one to true
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

ctr.updateLocations = async (req, res) => {
  const id = req.params.id
  const locations = req.body.locations
  try {
    const update = await Museo.updateOne({ _id: id }, { $set: { locations: locations } }); // set one to true
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = ctr