import { ObjectId } from "mongodb";
import db, { medicationCollection } from "../mongodb/conn.js";

export async function createMedication(medication) {
    try {
        var newDocument = medication;
        var result = await medicationCollection.insertOne(newDocument);
        return result.acknowledged == true;
    } catch (err) {
        console.error("Error in createMedication", err.message);
    }
}

export async function getAllMedications(limit = 0) {
    try {
        return medicationCollection
            .limit(limit)
            .toArray();
    } catch (err) {
        console.error("Error in getAllMedications", err.message);
    }
}

export async function getMedicationsCount() {
    try {
        return await medicationCollection.countDocuments();
    } catch (err) {
        console.error("Error in getMedicationsCount", err.message);
    }
}

export async function getMedication(id) {
    try {
        var query = getObjectIdQuery(id);

        var result = await medicationCollection.findOne(query);

        return result;
    } catch (err) {
        console.error("Error in getMedication", err.message);
    }
}

export async function updateMedication(id, medication) {
    try {
        const query = getObjectIdQuery(id);
        const updates = { $set: medication };

        var result = await medicationCollection.updateOne(query, updates);
        var insertedMedication = await getMedication(id);
        result.insertedMedication = insertedMedication;
        return  result.acknowledged == true;
    } catch (err) {
        console.error("Error in updateMedication", err.message);
    }
    return false;
}

export async function deleteMedication(id) {
    try {
        const query = getObjectIdQuery(id);
        if (medicationCollection) {
            var result = await medicationCollection.deleteOne(query);
            return result.deletedCount == 1;
        }
    } catch (err) {
        console.error("Error in deleteMedication", err.message);
    }

    return false;
}

function getObjectIdQuery(id) {
    return { _id: new ObjectId(id) };
}