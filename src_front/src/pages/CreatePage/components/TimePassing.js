import React, { useState } from 'react';
import { TextField } from '@mui/material';



export default function TimePassing() {

    const [ time_passing, setTimePassing] = useState('');

    const handleChange = (event) => {
        setTimePassing(event.target.value);
    };
  

  return ( 
          <TextField  type="number" id="time_passing" sx={{ m: 1, minWidth: 120 }}
          label="Время прохождения"
          helperText="Введите длительность прохождения"
           value={time_passing}
           onChange={handleChange}
           inputProps={{ min:1, ref: (input) => input && input.focus() }}
           />
  );
}