import React, { useState } from 'react';
import { TextField } from '@mui/material';



export default function DataEnd() {

    const [ end_time, setEndTime] = useState('');
    const today = new Date();
    today.setDate(today.getDate());

    const handleChange = (event) => {
      setEndTime(event.target.value);
    };
  

  return ( 
          <TextField  type="datetime-local" id="end_time" sx={{ m: 1, minWidth: 120 }}
  
          helperText="Введите дату закрытия опроса"
           value={end_time}
           onChange={handleChange}
           inputProps={{ min: today.toISOString().slice(0, 16), ref: (input) => input && input.focus() }}
           />
  );
}