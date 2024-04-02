import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patient.route.js";
import medicationRoutes from "./routes/medication.route.js";
import {loadFhirPatients, loadFhirMedications} from "./controllers/fhir.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', patientRoutes);
app.use('/', medicationRoutes);

loadFhirPatients();
loadFhirMedications();

app.listen(5001, () => {
    console.log("server has started on port 5001");
});
