/*import Router from "express";
import obraSchema from "../models/obra.js";
const obraController = require("../controllers/obra.js");*/
const express = require("express");
const obraController = require("../controllers/obra.js");
const router = express.Router();

//GET METHODS
router.get("/obra", obraController.getAllObras());
router.get("/obra/:id", obraController.getObra());

//POST METHODS
router.post("/obra",obraController.createNewObra());

//DELETE METHODS
router.delete("/obra/:id",obraController.deleteObra());

//PUT METHODS
router.put("/obra/:id", obraController.updateObra());

module.exports = router;