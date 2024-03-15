import { MongoClient } from "mongodb";

const connectionString = "mongodb://medule:password@localhost:27017";

const client = new MongoClient(connectionString);

var conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

var db = conn.db("medule");

export const patientCollection = db.collection("patient");
export const medicationCollection = db.collection("medication");
export const scheduleCollection = db.collection("schedule");

export default db;
