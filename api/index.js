import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import patientRoutes from "./routes/patient.route.js";
import medicationRoutes from "./routes/medication.route.js";

const app = express();

// dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/patient', patientRoutes);
app.use('/medication', medicationRoutes);

app.listen(5001, () => {
    console.log("server has started on port 5001");
});
