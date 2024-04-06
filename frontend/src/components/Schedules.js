import React from "react";
import { Box } from "@mui/material";

// import {getPatients} from "../actions/Patient";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
// const SCHEDULE_ENDPOINT = process.env.REACT_APP_API_ENDPOINT+"/schedule" || "http://localhost:5001/schedule";
const SCHEDULE_ENDPOINT = "http://localhost:5001/schedule";

class Schedules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: {},
            columns: [
                { field: 'patientName', headerName: 'Patient', width: 150 },
                { field: 'medication', headerName: 'Medications', width: 150 }
            ]
        };
    }

    async componentDidMount() {
        axios({
            url: `${SCHEDULE_ENDPOINT}`,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({ schedules: res.data })
        })
    };

    render() {
        console.log(this.state.schedules);
        return (
            <Box m="20px">
                <Box overflow="hidden">
                    <DataGrid
                        rows={this.state.schedules}
                        columns={this.state.columns}
                        autoHeight={true}
                        getRowId={(row) => row._id?.$oid || row._id}
                        // onRowClick={handleRowClick}
                        slotProps={{
                            row: {
                                style: {
                                    cursor: "pointer"
                                }
                            }
                        }}
                    />
                </Box>
            </Box>
        );
    }
};

export default Schedules;