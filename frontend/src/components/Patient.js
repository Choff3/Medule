import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preloadedRow: {}
            // patient: props.patient,
        };
    }

    async componentDidMount() {
        console.log("poop");
        console.log(this.state.preloadedRow);
        console.log(this.props);
        // axios({
        //     url: `${SCHEDULE_ENDPOINT}`,
        //     method: 'GET',
        //     headers: {"Content-Type": "application/json"}
        // }).then(res => {
        //     this.setState({ patients: res.data })
        // })
    };

    render() {
        return (
            <Box m="20px">
                poop
            </Box>
        );
    }
};

export default Patient;