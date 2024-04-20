import express from "express";
import * as patientController from "../controllers/patient.controller.js";
import {getPatient} from "../controllers/patient.controller.js";

const router = express.Router();

router.get("/patients", async (req, res) => {
    const patients = await patientController.getAllPatients();
    res.json(patients);
});

router.get("/patients/:id", async (req, res) => {
    const patient = await patientController.getPatient(req.params.id);
    res.json(patient);
});

export default router;
