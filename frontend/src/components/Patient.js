import React from "react";
import {Box, Button, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import { PATIENT_ENDPOINT, SCHEDULE_ENDPOINT } from "../constants";

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
            const birthdate = typeof(res.data[0].resource.birthDate) !== 'undefined' ? res.data[0].resource.birthDate : "not found";
            const gender = typeof(res.data[0].resource.gender) !== 'undefined' ? res.data[0].resource.gender : "not found";
            const phone = typeof(res.data[0].resource.telecom) !== 'undefined' ? res.data[0].resource.telecom[0].value : "not found";
            let address = "not found";
            try{
                address = res.data[0].resource.address[0].line[0]+"\n"+res.data[0].resource.address[0].city+", "+res.data[0].resource.address[0].state;
            }catch (e){
                console.error(e);
            }

            this.setState({
                patient: res.data[0].resource,
                patientGender: gender,
                patientBirthdate: birthdate,
                patientAddress: address,
                patientPhone: phone
            });
        })

        await axios({
            url: SCHEDULE_ENDPOINT+"/"+this.state.patientId,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({schedule: res.data[0].medication, patientName: res.data[0].patientName});
        })
    };

    async handleClick(){
        if (this.state.addMedId !== "Select Medication"){
            const newMedication = {
                "medicationId": this.state.addMedId,
                "medicationTime": this.state.addMedTime.$d
            }
            let schedule = this.state.schedule;
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
                    "start": med.medicationTime,
                    "end": med.medicationTime
            };
            events.push(event);
            return event;
        });
        return events;
    }

    render() {
        // TODO: Hover over med on schedule for quick info
        // TODO: Button to delete meds
        return (
            <Box>
                <Box m="20px" bgcolor='primary.main'>
                    Name: {this.state.patientName}
                    <br/>
                    Birthdate: {this.state.patientBirthdate}
                    <br/>
                    Gender: {this.state.patientGender}
                    <br/>
                    Phone/Email: {this.state.patientPhone}
                    <br/>
                    Address: {this.state.patientAddress}
                </Box>
                <Box m="20px" bgcolor='primary.secondary'>
                    <InputLabel id="add-med-label">Add New Medication</InputLabel>
                    <Select
                        labelId="add-med-label"
                        id="add-med-select"
                        label="Medication"
                        value={this.state.addMedId ? this.state.addMedId : ""}
                        onChange={(newMed) => this.setState({addMedId: newMed.target.value})}
                    >
                        <MenuItem disabled value={"Select Medication"}>{"Select Medication"}</MenuItem>
                        {
                            this.props.medication.map((med) => {
                                return <MenuItem key={med.value} value={med.value}>{med.label}</MenuItem>
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
}
export default Patient;