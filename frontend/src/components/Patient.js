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
            schedule: [],
            medication: [],
            addMedId: "Select Medication",
            addMedTime: dayjs(),
        }
        this.handleClick = this.handleClick.bind(this);
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
            this.setState({schedule: res.data[0].medication});
        })

        await axios({
            url: MEDICATION_ENDPOINT+"/names",
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({medication: res.data});
        })
    };

    async handleClick(){
        // Add new med to patient schedule state and mongo
        const newMedication = {
            "_id": this.state.addMedId,
            "time": this.state.addMedTime.$d // TODO: May want to just extract time depending on how FullCalendar works
        }
        var schedule = this.state.schedule;
        this.setState({ schedule: schedule.push(newMedication) });

        newMedication['patientId'] = this.state.patientId;
        await axios({
            url: SCHEDULE_ENDPOINT+"/medication",
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            data: newMedication
        })
    }

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
                        label="Medication"
                        onChange={(newMed) => this.setState({addMedId: newMed.target.value})}
                        // TODO: Add default dropdown option
                    >
                        {
                            this.state.medication.map((med) => {
                                return <MenuItem key={med[0]} value={med[0]}>{med[1]}</MenuItem>
                            })
                        }
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            id="add-med-time"
                            label="Time"
                            value={this.state.addMedTime}
                            onChange={(newTime) => this.setState({addMedTime: newTime})}
                        />
                    </LocalizationProvider>
                    <Button
                        onClick={this.handleClick}
                    >
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