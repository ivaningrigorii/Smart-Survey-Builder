
import { Select, MenuItem} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import StartTime from './StartTime';
import EndTime from './EndTime';
import TimePassing from './TimePassing';
import Box from '@mui/material/Box';

// export default function ChangeTypeOfPoll() {
//   const [resourcetype, setResourcetype] = useState('SurveySimple');
//   const [showTimeFields, setShowTimeFields] = useState(false);

//   const handleSelectChange = (selectedOption) => {
//     setResourcetype(selectedOption);
//     setShowTimeFields(selectedOption=== "SurveyTest");
//     console.log(`Option selected:`, selectedOption);
//   };
 
//   // const handleSelectChange = resourcetype => {
//   //   setResourcetype({ resourcetype });
//   //   setShowTimeFields(resourcetype==="SurveyTest");
//   //   console.log(`Option selected:`, resourcetype.target.value);
//   // };


//   const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     Select: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: '25ch',
//     },
//   }));

//   return (
//     <div>
//         <Box  sx={{ marginTop:2, flexGrow: 1,  width: '95%',
//         maxWidth: '100%'}}>         
//          <FormControl sx={{ m: 1, minWidth: 120 }}>
//       <InputLabel id="demo-simple-select-helper-label">Тип опроса</InputLabel>
//       <Select
//        labelId="demo-simple-select-helper-label"
//         value={resourcetype}
//         id="resourcetype"
//         onChange={handleSelectChange}
//         label="Тип опроса"
//         helperText="Выберите тип опроса"
//         sx={{ m: 1, minWidth: 130 }}
//         inputProps={{ ref: (input) => input && input.focus() }}
//       >
//         <MenuItem value="SurveySimple">Простой</MenuItem>
//         <MenuItem value="SurveyTest">Тестовый</MenuItem>
//       </Select>
//       {showTimeFields && (
//         <div>
//           <StartTime/>
//           <EndTime/>
//           <TimePassing/>
//         </div>
//       )}
//       </FormControl>
//       </Box>    
//     </div>
//   );
// }

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
        sx={{ width: 300 }}
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