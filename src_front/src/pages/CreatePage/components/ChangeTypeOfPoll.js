import FormControl from '@mui/material/FormControl';
import StartTime from './StartTime';
import EndTime from './EndTime';
import TimePassing from './TimePassing';
import Box from '@mui/material/Box';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

const options = ['Обычный опрос', 'Тестовый опрос'];

export default function ControllableStates() {
  const [resourcetype, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [showTimeFields, setShowTimeFields] = useState(false);

  return (
    <div>
         <Box  sx={{ marginTop:2, flexGrow: 1,  width: '95%',
        maxWidth: '100%'}}>         
         <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Autocomplete
        value={resourcetype}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          
          setInputValue(newInputValue);
          setShowTimeFields(newInputValue=== "Тестовый опрос");
        }}
        id="resourcetype"
        options={options}
        sx={{ m: 1, width: 300 }}
        renderInput={(params) => <TextField {...params}  label="Тип вопроса" /> }

      />
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