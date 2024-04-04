import React from "react";
import { Box } from "@mui/material";

// import {getPatients} from "../actions/Patient";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
const PATIENT_ENDPOINT = process.env.REACT_APP_PATIENT_ENDPOINT || "http://localhost:5001/patient";

class Patients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: {},
            columns: [
                { field: 'patient', headerName: 'Patient', width: 150 },
                { field: 'medications', headerName: 'Medications', width: 150 }
            ]
        };
    }

    async componentDidMount() {
        axios({
            url: `${PATIENT_ENDPOINT}`,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            this.setState({ patients: res.data })
        })
    }

    render() {
        console.log(this.state.patients);
        return (
            <Box m="20px">
                <Box overflow="hidden">
                    Hello!
                    <DataGrid
                        rows={this.state.patients}
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

export default Patients;