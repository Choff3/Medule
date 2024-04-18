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
            { field: 'patient', headerName: 'Patient', width: 200 },
            { field: 'medication', headerName: 'Medications', width: 200 }
    ];

    function getMedicationName(searchKey) {
        const search = props.medication.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)))[0];
        if (search !== undefined){
            return search[1];
        }
        else{
            return searchKey;
        }
    }

    function getMedicationString(medicationArray) {
        let result = "";
        medicationArray.map((medication) => {
            result = result+getMedicationName(medication.medicationId)+", ";
        });
        return result;
    }

    useEffect(() => {
        axios({
            url: `${SCHEDULE_ENDPOINT}`,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            let tableData = [];
            res.data.map((schedule) => {
                const rowData = {
                    "_id": schedule._id,
                    "patient": schedule.patientName,
                    "medication": getMedicationString(schedule.medication)
                };
                tableData.push(rowData);
            });
            setTable(tableData);
        })
    },[getMedicationString]);

    return (
        <Box m="20px">
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