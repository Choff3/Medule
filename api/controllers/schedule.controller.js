import { ObjectId } from "mongodb";
import {scheduleCollection} from "../mongodb/conn.js";

export async function getAllSchedules(limit = 0) {
    try {
        return scheduleCollection.find().toArray();
    } catch (err) {
        console.error("Error in getAllSchedules", err.message);
    }
}

export async function getSchedulesCount() {
    try {
        return await scheduleCollection.countDocuments();
    } catch (err) {
        console.error("Error in getSchedulesCount", err.message);
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