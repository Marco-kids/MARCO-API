const ARLoaction = require("../models/ARLocation.js");
const upload = require("../middleware/uploadLocation");
require("dotenv").config();
const mongoose = require("mongoose")
let ctr = {};

ctr.createNewARLocation = () => async (req, res) => {
    try {
        const {nombre, screenshot, ARWorldMap} = req.body;
        
        const newARLocation = ARLoaction({
            nombre: nombre,
            screenshot: req.files.screenshot[0].path,
            ARWorldMap: req.files.ARWorldMap[0].path
        });
        newARLocation.save()
        .then(result => {
            res.status(201).json({
              message: 'Image uploaded successfully',
              image: result
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });

    } catch(e) {
        return res.status(500).json(e);
    }
}

ctr.getAllARLocations = () => async (req, res) => {
    try {
        const arLocations = ARLoaction.find(function(err, docs) {
            if (err) {
                res.status(500).json("Error finding ARLocations")
            }
            res.json(docs)
        })
    } catch {
        res.status(500).json("Error finding obras")
    }
}

module.exports = ctr