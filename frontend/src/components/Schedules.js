import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
const SCHEDULE_ENDPOINT = "http://localhost:5001/schedule";

const Schedules = () => {
    const [schedule, setSchedule] = useState(0);
    const navigate = useNavigate();
    const columns = [
            { field: 'patientName', headerName: 'Patient', width: 200 },
            { field: 'medication', headerName: 'Medications', width: 200 }
    ];

    useEffect(() => {
        axios({
            url: `${SCHEDULE_ENDPOINT}`,
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            setSchedule(res.data);
        })
    });

    return (
        <Box m="20px">
            <Box overflow="hidden">
                <DataGrid
                    rows={schedule}
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