import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
const PATIENT_ENDPOINT = "http://localhost:5001/patient";
const SCHEDULE_ENDPOINT = "http://localhost:5001/schedule";

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: window.location.href.split("/")[4],
            patient: {},
            schedule: {}
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
        console.log(this.state.patient)

        await axios({
            url: SCHEDULE_ENDPOINT+"/"+this.state.patientId,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({schedule: res.data[0]});
        })
        console.log(this.state.schedule)
    };

    render() {
        // TODO: Add box for patient info
        return (
            <Box m="20px" bgcolor='primary.main'>
                {this.state.schedule.patientName}
            <Box />
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
        );
    }
};
//                    {/*events={events}*/}
//                     {/*eventContent={renderEventContent}*/}
export default Patient;