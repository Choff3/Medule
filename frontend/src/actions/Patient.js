import axios from "axios";

const PATIENT_ENDPOINT = process.env.REACT_APP_PATIENT_ENDPOINT || "http://localhost:5001/patient";
export const getPatients = async () => {
  try {
    const response = await axios({
      url: `${PATIENT_ENDPOINT}`,
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    });
    return response.data;
  } catch (e) {
    console.error("Error while retrieving entries:", e.message);
  }

  return [];
};

export const getPatient = async (id) => {
  const response = await axios({
    url: `${PATIENT_ENDPOINT}/${id}`,
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  });

  return response;
};

export const createPatient = async (patient) => {
    await axios({
      url: PATIENT_ENDPOINT,
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      data: patient
    });
  return true;
};

export const updatePatient = async (id, body) => {
    await axios({
      url: `${PATIENT_ENDPOINT}/${id}`,
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(body),
    });

  return true;
};

export const deletePatient = async (id) => {
  await axios.delete(`${PATIENT_ENDPOINT}/${id}`);
  return true;
};
