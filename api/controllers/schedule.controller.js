import {scheduleCollection} from "../mongodb/conn.js";

export async function getAllSchedules(limit = 0) {
    try {
        return scheduleCollection.find().toArray();
    } catch (err) {
        console.error("Error in getAllSchedules", err.message);
    }
}

export async function getSchedule(id) {
    try {
        const result = await scheduleCollection.find({ '_id': id }).toArray();
        return result;
    } catch (err) {
        console.error("Error in get getSchedule", err.message);
    }
}

export async function addMedication(medication) {
    try {
        const result = scheduleCollection.updateOne({
                "_id": medication.body.patientId
            },
            {
                "$push": {
                    "medication": {
                        "medicationId": medication.body.medicationId,
                        "medicationTime": medication.body.medicationTime
                    }
                }
            }
        );
        return result;
    } catch (err) {
        console.error("Error in createItem", err.message);
    }
}
