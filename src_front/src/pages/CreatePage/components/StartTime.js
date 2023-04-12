import React, { useState } from 'react';
import { TextField } from '@mui/material';


export default function StartTime() {

    const [ start_time, setStartTime] = useState('');
    const today = new Date();
    today.setDate(today.getDate());
    const handleChange = (event) => {
      setStartTime(event.target.value);
    };
  

  return ( 
          <TextField  type="datetime-local" id="start_time" sx={{ m: 1, minWidth: 120 }}
           helperText="Введите дату открытия опроса"
           value={start_time}         
           onChange={handleChange}
           inputProps={{ min: today.toISOString().slice(0, 16),ref: (input) => input && input.focus() }}
           />
  );
}