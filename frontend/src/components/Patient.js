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

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: window.location.href.split("/")[4],
            patient: {},
            schedule: [],
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
    };

    async handleClick(){
        const newMedication = {
            "medicationId": this.state.addMedId,
            "medicationTime": this.state.addMedTime.$d // TODO: May want to just extract time depending on how FullCalendar works
        }
        var schedule = this.state.schedule;
        schedule.push(newMedication);
        this.setState({ schedule: schedule });

        newMedication['patientId'] = this.state.patientId;
        await axios({
            url: SCHEDULE_ENDPOINT+"/medication",
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            data: newMedication
        })
    }

    getMedicationName(searchKey) {
        const search = this.props.medication.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)))[0];
        return search !== undefined ? search.label : searchKey;
    }

    getCalendarEvents() {
        var events = [];
        this.state.schedule.map((med) => {
            const event = {
                    "title": this.getMedicationName(med.medicationId),
                    "start": med.medicationTime, // TODO: Convert to milliseconds or whatever
                    "end": med.medicationTime+1 // TODO: Convert to milliseconds or whatever
            };
            events.push(event);
            return event;
        });
        return events;
    }

    render() {
        // TODO: Add box for patient info
        // TODO: Hover over med on schedule for quick info
        // TODO: Add home button to return to patient list
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
                        // options={this.props.medication}
                        // TODO: Add default dropdown option
                    >
                        {
                            this.props.medication.map((med) => {
                                return <MenuItem key={med[0]} value={med.value}>{med.label}</MenuItem>
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
                        events={this.getCalendarEvents()}
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
export default Patient;