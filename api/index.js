import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patient.route.js";
import medicationRoutes from "./routes/medication.route.js";

const FHIR_SERVER = process.env.FHIR_SERVER_ENDPOINT

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/patient', patientRoutes);
app.use('/medication', medicationRoutes);

console.log(FHIR_SERVER);

// TODO: Use axios to get all the patients from
// FHIR_SERVER+"/Patient"
// console.log(patients);

app.listen(5001, () => {
    console.log("server has started on port 5001");
});
