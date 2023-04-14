import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Name() {

  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

 
  return (

    <Box  sx={{ marginTop:10, flexGrow: 1,  width: '95%',
        maxWidth: '100%'}}>         
      <TextField
          name="name"
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
          value={name}
          onChange={handleChange}
          inputProps={{ maxLength: 100, ref: (input) => input && input.focus() }}
        />             
         </Box>    
  );
}

export default Name;