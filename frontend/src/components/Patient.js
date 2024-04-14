import React from "react";
import {Box, Button, InputLabel, Select} from "@mui/material";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
const PATIENT_ENDPOINT = "http://localhost:5001/patient";
const SCHEDULE_ENDPOINT = "http://localhost:5001/schedule";
const MEDICATION_ENDPOINT = "http://localhost:5001/medication";

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: window.location.href.split("/")[4],
            patient: {},
            schedule: {},
            medication: {},
        }
    }

    async componentDidMount() {
        await axios({
            url: PATIENT_ENDPOINT+"/"+this.state.patientId,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({patient: res.data[0].resource});
        })

        await axios({
            url: SCHEDULE_ENDPOINT+"/"+this.state.patientId,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({schedule: res.data[0]});
        })

        await axios({
            url: MEDICATION_ENDPOINT+"/names",
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({medication: res.data});
        })
        console.log(this.state.medication)
    };

    render() {
        // TODO: Add box for patient info
        return (
            <Box>
                <Box m="20px" bgcolor='primary.main'>
                    {this.state.schedule.patientName}
                </Box>
                <Box>
                    <InputLabel id="add-med-label">Add New Medication</InputLabel>
                    <Select
                        labelId="add-med-label"
                        id="add-med-select"
                        value={this.state.medication} //TODO: Fill dropdown with medication names, try to track ID for better insert as well.
                        label="Medication"
                        // onChange={handleChange}
                    />
                    <Button>
                        Add
                    </Button>
                </Box>
                <Box m="20px" bgcolor='primary.secondary'>
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView='timeGridDay'
                        height='auto'
                        allDaySlot={false}
                        headerToolbar={{
                            "left": '',
                            "center": '',
                            "right": ''
                        }}
                    />
                </Box>
            </Box>
        );
    }
};
//                    {/*events={events}*/}
//                     {/*eventContent={renderEventContent}*/}
export default Patient;