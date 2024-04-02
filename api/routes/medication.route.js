import express from "express";
import * as medicationController from "../controllers/medication.controller.js";

const router = express.Router();

router.get("/medication", async (req, res) => {
    const medications = await medicationController.getAllMedications();
    res.json(medications);
});

router.get("/medication/getMedicationsCount", async (req, res) => {
    const count = await medicationController.getMedicationsCount();
    res.json(count);
});

router.get("/medication/:id", async (req, res) => {
    const medication = await medicationController.getSpecificMedication(req.params.id);
    res.json(medication);
});

export default router;
