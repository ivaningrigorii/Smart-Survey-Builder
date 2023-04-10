import React, { useState } from 'react';
import { Select, MenuItem, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@material-ui/core/styles';


export default function ChangeTypeOfPoll() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showTimeFields, setShowTimeFields] = useState(false);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setShowTimeFields(value === 'SurveyTest');
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
         <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Тип опроса</InputLabel>
      <Select
       labelId="demo-simple-select-helper-label"
        value={selectedOption}
        id="resourcetype"
        onChange={handleSelectChange}
        label="Тип опроса"
        helperText="Выберите тип опроса"
      >
        <MenuItem value="SurveySimple">Простой</MenuItem>
        <MenuItem value="SurveyTest">Тестовый</MenuItem>
      </Select>
      {showTimeFields && (
        <div>
          <TextField  type="datetime-local" id="start_time"/>
          <TextField  type="datetime-local" id="end_time" />
          <TextField  type="number" id="time_passing"/>
        </div>
      )}
      </FormControl>
    </div>
  );
}