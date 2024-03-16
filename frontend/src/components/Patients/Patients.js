import React, { useContext } from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { DataContext } from "../../providers/DataProvider";

import Patient from './Patient/Patient';
import useStyles from './styles';

const Patients = ({ setCurrentId }) => {
  const { patients } = useContext(DataContext);
  const classes = useStyles();

  return (
    !patients.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {patients.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Patient post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Patients;
