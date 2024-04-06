import express from "express";
import * as patientController from "../controllers/patient.controller.js";
import {getPatient} from "../controllers/patient.controller.js";

const router = express.Router();

router.get("/patient", async (req, res) => {
    const patients = await patientController.getAllPatients();
    res.json(patients);
});

router.get("/patient/getPatientsCount", async (req, res) => {
    const count = await patientController.getPatientsCount();
    res.json(count);
});

router.get("/patient/:id", async (req, res) => {
    const patient = await patientController.getPatient(req.params.id);
    res.json(patient);
});

export default router;
