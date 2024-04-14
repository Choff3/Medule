import React from "react";
import {Box, Button, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
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
            medication: [],
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
                        width='100px'
                        value={this.state.medication}
                        label="Medication"
                    >
                        {
                            this.state.medication.map((med) => {
                                return <MenuItem key={med[0]} value={med[1]}>{med[1]}</MenuItem>
                            })
                        }
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Uncontrolled picker"
                            defaultValue={dayjs('2022-04-17T15:30')}
                        />
                    </LocalizationProvider>
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