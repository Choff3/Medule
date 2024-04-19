import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'medule'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password'
const MONGO_ENDPOINT = process.env.MONGO_ENDPOINT || 'localhost:27017'

const connectionString = "mongodb://"+MONGO_USERNAME+":"+MONGO_PASSWORD+"@"+MONGO_ENDPOINT;

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn.db("medule");

export const patientCollection = db.collection("patient");
export const medicationCollection = db.collection("medication");
export const scheduleCollection = db.collection("schedule");

export default db;
