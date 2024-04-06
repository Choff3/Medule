import React from "react";
import { Box } from "@mui/material";

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        console.log(this.props);
    };

    render() {
        return (
            <Box m="20px">
                hello
            </Box>
        );
    }
};

export default Patient;