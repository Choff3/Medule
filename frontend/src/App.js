import './App.css';
import Schedules from "./components/Schedules";
import Patient from "./components/Patient";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import HomeButton from "./components/HomeButton";

const MEDICATION_ENDPOINT = "http://localhost:5001/medication";

function App() {
    const [medication, setMedication] = useState([]);

    useEffect(() => {
        axios({
            url: MEDICATION_ENDPOINT+"/names",
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            setMedication(res.data);
        })
    },[]);

  return (
    <div className="App">
        <header className="App-header">
            <BrowserRouter>
                <HomeButton/>
                <Routes>
                    <Route
                        path="/"
                        element={<Schedules medication={medication}/>}
                    />
                    <Route path="/patient/:patientid" element={<Patient medication={medication}/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </BrowserRouter>
        </header>
    </div>
  );
}

export default App;
