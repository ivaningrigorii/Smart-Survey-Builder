import React, { useState } from 'react';
import { Select, MenuItem} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import StartTime from './StartTime';
import EndTime from './EndTime';
import TimePassing from './TimePassing';
import Box from '@mui/material/Box';

export default function ChangeTypeOfPoll() {
  const [resourcetype, setResourcetype] = useState('');
  const [showTimeFields, setShowTimeFields] = useState(false);

  const handleSelectChange = (event) => {
    setResourcetype(event.target.value);
    setShowTimeFields(event.target.value === 'SurveyTest');
  };


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    Select: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));

  return (
    <div>
        <Box  sx={{ marginTop:2, flexGrow: 1,  width: '95%',
        maxWidth: '100%'}}>         
         <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Тип опроса</InputLabel>
      <Select
       labelId="demo-simple-select-helper-label"
        value={resourcetype}
        id="resourcetype"
        onChange={handleSelectChange}
        label="Тип опроса"
        helperText="Выберите тип опроса"
        sx={{ m: 1, minWidth: 130 }}
        inputProps={{ ref: (input) => input && input.focus() }}
      >
        <MenuItem value="SurveySimple" >Простой</MenuItem>
        <MenuItem value="SurveyTest">Тестовый</MenuItem>
      </Select>
      {showTimeFields && (
        <div>
          <StartTime/>
          <EndTime/>
          <TimePassing/>
        </div>
      )}
      </FormControl>
      </Box>    
    </div>
  );
}