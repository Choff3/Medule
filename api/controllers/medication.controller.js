import {medicationCollection} from "../mongodb/conn.js";

export async function getAllMedications(limit = 0) {
    try {
        return medicationCollection.find().toArray();
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
        const result = await medicationCollection.find({ '_id': id }).toArray();
        return result;
    } catch (err) {
        console.error("Error in getMedication", err.message);
    }
}
