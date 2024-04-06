import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
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

    // handleRowClick(event) {
    //     // const navigate = useNavigate();
    //     console.log(event.id);
    //     const page = "/patient/"+event.id
    //     this.props.navigation.navigate("/patient/"+event.id);
    // };

    render() {
        return (
            <Box m="20px">
                <Box overflow="hidden">
                    <DataGrid
                        rows={this.state.schedules}
                        columns={this.state.columns}
                        autoHeight={true}
                        getRowId={(row) => row._id?.$oid || row._id}
                        // onRowClick={this.handleRowClick}
                        onRowClick={(e) => navigation.navigate("/patient/"+e.id)}
                    />
                </Box>
            </Box>
        );
    }
};

export default Schedules;