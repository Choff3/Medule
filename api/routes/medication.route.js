import express from "express";
import * as medicationController from "../controllers/medication.controller.js";

const router = express.Router();

router.post("/medication/", async (req, res) => {
    const result = await medicationController.createMedication(req.body);
    processResult(result, res);
});

router.put("/medication/:id", async (req, res) => {
    const result = await medicationController.updateMedication(req.params.id, req.body);
    processResult(result, res);
});

router.get("/medication/", async (req, res) => {
    const filters = req.query.filters;
    const limit = parseFloat(req.query.limit);
    const medications = await medicationController.getAllMedications(filters, limit);

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

router.delete("/medication/:id", async (req, res) => {
    const result = await medicationController.deleteMedication(req.params.id);
    processResult(result, res);
});

function processResult(result, response) {
    if (result) {
        response.sendStatus(200);
    } else {
        response.sendStatus(500);
    }
}

export default router;
