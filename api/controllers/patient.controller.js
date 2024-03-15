import { ObjectId } from "mongodb";
import db, { patientCollection } from "../mongodb/conn.js";

export async function createPatient(patient) {
    try {
        var newDocument = patient;
        var result = await patientCollection.insertOne(newDocument);
        return result.acknowledged == true;
    } catch (err) {
        console.error("Error in createPatient", err.message);
    }
}

export async function getAllPatients(limit = 0) {
    try {
        return patientCollection
            .limit(limit)
            .toArray();
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
        var query = getObjectIdQuery(id);

        var result = await patientCollection.findOne(query);

        return result;
    } catch (err) {
        console.error("Error in getPatient", err.message);
    }
}

export async function updatePatient(id, patient) {
    try {
        const query = getObjectIdQuery(id);
        const updates = { $set: patient };

        var result = await patientCollection.updateOne(query, updates);
        var insertedPatient = await getPatient(id);
        result.insertedPatient = insertedPatient;
        return  result.acknowledged == true;
    } catch (err) {
        console.error("Error in updatePatient", err.message);
    }
    return false;
}

export async function deletePatient(id) {
    try {
        const query = getObjectIdQuery(id);
        if (patientCollection) {
            var result = await patientCollection.deleteOne(query);
            return result.deletedCount == 1;
        }
    } catch (err) {
        console.error("Error in deletePatient", err.message);
    }

    return false;
}

function getObjectIdQuery(id) {
    return { _id: new ObjectId(id) };
}