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
                { field: 'col1', headerName: 'Column 1', width: 150 },
                { field: 'col2', headerName: 'Column 2', width: 150 },
                { field: 'col3', headerName: 'Column 3', width: 150 },
                { field: 'col4', headerName: 'Column 4', width: 150 },
                { field: 'col5', headerName: 'Column 5', width: 150 },
                { field: 'col6', headerName: 'Column 6', width: 150 },
                { field: 'col7', headerName: 'Column 7', width: 150 },
                { field: 'col8', headerName: 'Column 8', width: 150 },
                { field: 'col9', headerName: 'Column 9', width: 150 },
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