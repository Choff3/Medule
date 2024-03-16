import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPatient, updatePatient } from '../../actions/Patient';

const Form = ({ currentId, setCurrentId }) => {
  const [patientData, setPatientData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const patient = useSelector((state) => (currentId ? state.patients.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (patient) setPatientData(patient);
  }, [patient]);

  const clear = () => {
    setCurrentId(0);
    setPatientData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPatient(patientData));
      clear();
    } else {
      dispatch(updatePatient(currentId, patientData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${patient.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={patientData.creator} onChange={(e) => setPatientData({ ...patientData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={patientData.title} onChange={(e) => setPatientData({ ...patientData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={patientData.message} onChange={(e) => setPatientData({ ...patientData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={patientData.tags} onChange={(e) => setPatientData({ ...patientData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPatientData({ ...patientData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
