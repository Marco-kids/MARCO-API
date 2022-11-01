import { Router } from "express";
import obraSchema from "../models/obra";
const obraController = require("../controllers/obra");

const router = Router();


//GET METHODS
router.get("/obra", obraController.getAllObras());
router.get("/obra/:id", obraController.getObra());

//POST METHODS
router.post("/obra",obraController.createObra());

//DELETE METHODS
router.delete("/obra/:id",obraController.deleteObra());

//PUT METHODS
router.put("/obra/:id", obraController.updateObra());

export default router;