import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import ChangeTypeOfPoll from './ChangeTypeOfPoll';
import CreatePollButton from './CreatePollButton';
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
 
     return (
    <div className={classes.root}>
      <form>
      <Box sx={{ marginTop:10, flexGrow: 1,  width: '95%',
        maxWidth: '100%'}}>
      <TextField
          id="name"
          label="Название"
          style={{ margin: 20 }}
          helperText="Введите название опроса"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />     
     <div>        
         <TextField
          id="description"
          label="Описание"
          style={{ margin: 20 }}
          helperText="Введите краткое описание"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />   
         </div> 
         </Box>    
       < ChangeTypeOfPoll/>  
       <div>
        
        </div> 
       <CreatePollButton/>   
      
      
      </form>    
    </div>
  );
}

