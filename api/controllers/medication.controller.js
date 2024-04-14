import {medicationCollection} from "../mongodb/conn.js";

export async function getAllMedications(limit = 0) {
    try {
        return medicationCollection.find().toArray();
    } catch (err) {
        console.error("Error in getAllMedications", err.message);
    }
}

export async function getAllMedicationNames(limit = 0) {
    let medNames = [];
    try {
        const medications = await medicationCollection.find().toArray();
        medications.map(med => {
            const medName = [med.resource.id, med.resource.code.coding[0].display];
            medNames.push(medName);
        });
        return medNames;
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
