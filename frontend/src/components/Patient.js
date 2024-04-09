import React from "react";
import { Box } from "@mui/material";

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: window.location.href.split("/")[4]
        }
    }

    async componentDidMount() {
        console.log(this.state.patientId);
    };

    render() {
        return (
            <Box m="20px">
                {this.state.patientId}
            </Box>
        );
    }
};

export default Patient;