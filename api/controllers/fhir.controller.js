import axios from "axios";
import dotenv from "dotenv";
import { patientCollection, medicationCollection, scheduleCollection } from "../mongodb/conn.js";

dotenv.config();

const FHIR_SERVER = process.env.FHIR_SERVER_ENDPOINT || "https://demo.kodjin.com/fhir";

export async function loadFhirPatients(){
    try {
        const response = await axios.get(`${FHIR_SERVER}/Patient`);
        for (const key in response.data.entry){ // TODO: change to updateMany()
            const patient = response.data.entry[key];
            const patientName = getPatientName(patient);
            await patientCollection.updateOne(
                {_id: patient.resource.id},
                {$set: patient},
                {upsert:true}
            );
            await createSchedule(patient.resource.id, patientName);
        }
    } catch (e) {
        console.error("Error while retrieving Patients:", e.message);
    }
};

export async function loadFhirMedications(){
    try {
        const response = await axios.get(`${FHIR_SERVER}/Medication`);
        for (const key in response.data.entry){ // TODO: change to updateMany()
            const medication = response.data.entry[key];
            await medicationCollection.updateOne(
                {_id: medication.resource.id},
                {$set: medication},
                {upsert:true}
            );
        }
    } catch (e) {
        console.error("Error while retrieving Medications:", e.message);
    }
};

export async function createSchedule(patientId, patientName){
    try {
        const schedule = {
            "_id": patientId,
            "patientName": patientName,
            "medication": []
        }
        await scheduleCollection.insertOne(schedule);
    } catch (e) {
        console.error("Schedule already exists:", e.message);
    }
};

function getPatientName(patient){
    try{
        return patient.resource.name[0].given[0]+" "+patient.resource.name[0].family;
    }
    catch{
        return "Name not found";
    }
}