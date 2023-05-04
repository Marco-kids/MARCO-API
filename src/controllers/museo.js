const Museo = require("../models/museo.js");
require("dotenv").config();
const mongoose = require("mongoose")

ctr = {}

// GET all museo
ctr.listMuseo = () => async (req, res) => {
  try {
      const museos = await Museo.find().populate("locations").populate("obras")
      res.status(201).json(museos)
  } catch(error) {
      res.status(500).json({message: error.message})
  }
};

// GET active museo
ctr.getActiveMuseo = () => async (req, res) => {
  try {
      const museo = await Museo.findOne({ isActive: true }).populate("locations").populate("obras")
      res.status(201).json(museo)
  } catch(error) {
      res.status(500).json({message: error.message})
  }
};

// POST museo
ctr.createNewMuseo = () => async (req, res) => {
  try {
    const museo = new Museo({
      nombre: req.body.nombre,
      obras: req.body.obras,
      locations: req.body.locations,
      isActive: false
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
    res.status(201).json({message : "Activated"});
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = ctr