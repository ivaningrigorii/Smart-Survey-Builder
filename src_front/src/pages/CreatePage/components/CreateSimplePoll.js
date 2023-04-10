import React, { useState } from 'react';
import { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DateTimeForSurveyTest from './DateTimeForSurveyTest';
import Button from '@material-ui/core/Button';
import  { useEffect, useRef } from "react";

export default function CreatePoll ()  {

  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
      }
  
  }));

  const classes = useStyles();

const [name, setName] = useState('');
const [description, setDescription] = useState('');
// const [resourcetype, setResourcetype] = useState('');



// const handleSubmit = (event) => {
// event.preventDefault();
// setResourcetype("SurveySimple");
// sendData(name, description, resourcetype);
// };

  // const sendData = (name, description, resourcetype) => {
  //   fetch('/api/my-endpoint', {
  //     method: 'POST',
  //     body: JSON.stringify({ name, description, resourcetype}),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  // };



    
     return (
    <div className={classes.root}>
 
      {/* <form onSubmit={handleSubmit}> */}
      <form >
      <Box sx={{ marginTop:10, flexGrow: 1}}>
      <TextField
          id="name"
          value={name}
          label="Название"
          style={{ margin: 8 }}
          helperText="Введите название опроса"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // onChange={(event) => setName(event.target.value)}
        />     
         <TextField
          id="description"
          label="Описание"
          value={description}
          style={{ margin: 8 }}
          helperText="Введите краткое описание"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // onChange={(event) => setDescription(event.target.value)}
        />              
      <Button type="submit" variant="contained" color="secondary" href="/createPoll" >
  Создать опрос
</Button>        
      </Box>     
      </form>    
    </div>
  );
}

