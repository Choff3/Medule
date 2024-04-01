import axios from "axios";
import dotenv from "dotenv";
import { patientCollection, medicationCollection } from "../mongodb/conn.js";

dotenv.config();

const FHIR_SERVER = process.env.FHIR_SERVER_ENDPOINT || "https://demo.kodjin.com/fhir";

export async function loadFhirPatients(){
    try {
        const response = await axios.get(`${FHIR_SERVER}/Patient`);
        for (const key in response.data.entry){
            const patient = response.data.entry[key];
            await patientCollection.insertOne(patient);
        }
    } catch (e) {
        console.error("Error while retrieving Patients:", e.message);
    }
};

export async function loadFhirMedications(){
    try {
        const response = await axios.get(`${FHIR_SERVER}/Medication`);
        console.log(response);
        for (const key in response.data.entry){
            const medication = response.data.entry[key];
            await medicationCollection.insertOne(medication);
        }
    } catch (e) {
        console.error("Error while retrieving Medications:", e.message);
    }
};