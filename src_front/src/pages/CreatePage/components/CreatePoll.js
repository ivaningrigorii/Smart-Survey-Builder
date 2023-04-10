import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import ChangeTypeOfPoll from './ChangeTypeOfPoll';
import Button from '@material-ui/core/Button';


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

// const [name, setName] = useState('');
// const [description, setDescription] = useState('');
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
      <form>
      <Box sx={{ marginTop:10, flexGrow: 1}}>
      <TextField
          id="name"
          label="Название"
          style={{ margin: 8 }}
          helperText="Введите название опроса"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />     
         <TextField
          id="description"
          label="Описание"
          style={{ margin: 8 }}
          helperText="Введите краткое описание"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />     
       < ChangeTypeOfPoll/>  
             
      <Button type="submit" variant="contained" color="secondary" href="/createPoll" >
  Создать опрос
</Button>        
      </Box>     
      </form>    
    </div>
  );
}

