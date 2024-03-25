import React, { useContext } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useLocation } from 'react-router-dom';

const Patients = () => {
    // const location = useLocation();

    // const { patients } = useContext(DataContext);

    return (
        <Box m="20px">
            <Box overflow="hidden">
                Hello!
                {/*<DataGrid*/}
                {/*    // rows={filteredData}*/}
                {/*    // autoHeight={true}*/}
                {/*    // getRowId={(row) => row._id?.$oid || row._id}*/}
                {/*    // onRowClick={handleRowClick}*/}
                {/*    slotProps={{*/}
                {/*        row: {*/}
                {/*            style: {*/}
                {/*                cursor: "pointer"*/}
                {/*            }*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
            </Box>
        </Box>
    );
};

export default Patients;