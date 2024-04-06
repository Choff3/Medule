import axios from "axios";
import dotenv from "dotenv";
import { patientCollection, medicationCollection, scheduleCollection } from "../mongodb/conn.js";

dotenv.config();

const FHIR_SERVER = process.env.FHIR_SERVER_ENDPOINT || "https://demo.kodjin.com/fhir";

export async function loadFhirPatients(){
    try {
        const response = await axios.get(`${FHIR_SERVER}/Patient`);
        for (const key in response.data.entry){
            const patient = response.data.entry[key];
            await patientCollection.insertOne(patient);
            await createSchedule(patient.resource.id);
        }
    } catch (e) {
        console.error("Error while retrieving Schedules:", e.message);
    }
};

export async function loadFhirMedications(){
    try {
        const response = await axios.get(`${FHIR_SERVER}/Medication`);
        for (const key in response.data.entry){
            const medication = response.data.entry[key];
            await medicationCollection.insertOne(medication);
        }
    } catch (e) {
        console.error("Error while retrieving Medications:", e.message);
    }
};

export async function createSchedule(patientId){
    try {
        const schedule = {
            "patientId": patientId,
            "medication": []
        }
        await scheduleCollection.insertOne(schedule);
    } catch (e) {
        console.error("Error while retrieving Schedules:", e.message);
    }
};