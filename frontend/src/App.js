import './App.css';
import Schedules from "./components/Schedules";
import Patient from "./components/Patient";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter >
              <Routes>
                  <Route
                      path="/"
                      element={<Schedules />}
                  />
                  {/*<Route path="/entries" element={<Entries />} />*/}
                  <Route path="/patient/:patientid" element={<Patient />} />
                  {/* Default to main page for any undefined paths */}
                  <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
