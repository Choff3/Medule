import express from "express";
import * as patientController from "../controllers/patient.controller.js";

const router = express.Router();

router.post("/patient/", async (req, res) => {
    const result = await patientController.createPatient(req.body);
    processResult(result, res);
});

router.put("/patient/:id", async (req, res) => {
    const result = await patientController.updatePatient(req.params.id, req.body);
    processResult(result, res);
});

router.get("/patient/", async (req, res) => {
    const filters = req.query.filters;
    const limit = parseFloat(req.query.limit);
    const patients = await patientController.getAllPatients(filters, limit);

    res.json(patients);
});

router.get("/patient/getPatientsCount", async (req, res) => {
    const count = await patientController.getPatientsCount();
    res.json(count);
});

router.get("/patient/:id", async (req, res) => {
    const patient = await patientController.getSpecificPatient(req.params.id);
    res.json(patient);
});

router.delete("/patient/:id", async (req, res) => {
    const result = await patientController.deletePatient(req.params.id);
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
