import { ObjectId } from "mongodb";
import { patientCollection } from "../mongodb/conn.js";

export async function getAllPatients(limit = 0) {
    try {
        return patientCollection.find().toArray();
    } catch (err) {
        console.error("Error in getAllPatients", err.message);
    }
}

export async function getPatientsCount() {
    try {
        return await patientCollection.countDocuments();
    } catch (err) {
        console.error("Error in getPatientsCount", err.message);
    }
}

export async function getPatient(id) {
    try {
        const result = await patientCollection.find({ '_id': id }).toArray();
        return result;
    } catch (err) {
        console.error("Error in getPatient", err.message);
    }
}