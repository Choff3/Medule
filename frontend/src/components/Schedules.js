import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
const SCHEDULE_ENDPOINT = "http://localhost:5001/schedule";

const Schedules = (props) => {
    const [table, setTable] = useState([]);
    const navigate = useNavigate();
    const columns = [
            { field: 'patient', headerName: 'Patient', minWidth: 200 },
            { field: 'medication', headerName: 'Medications', minWidth: 200, flex: 1 }
    ];

    useEffect(() => {
        axios({
            url: `${SCHEDULE_ENDPOINT}`,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            let tableData = [];

            res.data.map((schedule) => {
                let medicationString = '';

                schedule.medication.map((medication) => {
                    const search = props.medication.filter(obj => Object.keys(obj).some(key => obj[key].includes(medication.medicationId)))[0];
                    const medicationName = search !== undefined ? search.label : medication.medicationId;
                    medicationString = medicationString+medicationName+", ";
                    return medicationString;
                });

                const rowData = {
                    "_id": schedule._id,
                    "patient": schedule.patientName,
                    "medication": medicationString
                };
                tableData.push(rowData);
                return rowData;
            });
            setTable(tableData);
        })
    },[props.medication]);

    return (
        <Box width="95%">
            All Patients
            <Box overflow="hidden">
                <DataGrid
                    rows={table}
                    columns={columns}
                    autoHeight={true}
                    getRowId={(row) => row._id?.$oid || row._id}
                    onRowClick={(e) => navigate("/patient/"+e.id)}
                />
            </Box>
        </Box>
    );
};

export default Schedules;