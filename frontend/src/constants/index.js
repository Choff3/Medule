import dotenv from "react-dotenv";

dotenv.config();

export const MEDICATION_ENDPOINT = process.env.REACT_APP_API_ENDPOINT+"/medication" || "http://localhost:5001/medication";
export const SCHEDULE_ENDPOINT = process.env.REACT_APP_API_ENDPOINT+"/schedule" || "http://localhost:5001/schedule";
export const PATIENT_ENDPOINT = process.env.REACT_APP_API_ENDPOINT+"/patient" || "http://localhost:5001/patient";