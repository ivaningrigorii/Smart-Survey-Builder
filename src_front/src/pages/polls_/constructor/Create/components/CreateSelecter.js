import Description from './custom_mui/Description';
import Name from './custom_mui/Name';
import React, { useState, } from 'react';
import { SSimple, STest } from './Polls';
import {
  FormControl, TextField,
  Autocomplete, Grid, Container,
  FormLabel, InputLabel, Select, MenuItem,
} from '@mui/material';
import CreatePollButton from './custom_mui/CreatePollButton';
import ServicesCreatePage from '../ServicesCreatePage';
import routes from '../../../../../routes';
import { reverse } from 'named-urls';

const createPageServices = new ServicesCreatePage();
const options = ['Обычный опрос', 'Тестовый опрос'];


const CreateSelecter = () => {
  const [optionResourcetype, setOptionResourcetype] = useState(1);
  const [data, setData] = useState({});

  const type_poll_components = {
    1: <SSimple data={data} setData={setData} />,
    2: <STest data={data} setData={setData} />
  };
    
  const handleChange = (event) => {
    setOptionResourcetype(event.target.value);
  };

  const handleSubmit = (event, selectedOption) => {
    event.preventDefault();

    let data_ = data;
    data_.name = event.target.name.value;
    data_.description = event.target.description.value;
    setData(data_);

    createPageServices.createPoll(data)
      .then((result) => {
        window.location.replace(reverse(routes.polls.constructor, { poll: result.id }));
      })
      .catch((exp) => {
        console.log(exp);
        alert("Опрос не был создан, проверьте введённые данные!");
      })
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center">
          <FormControl sx={{ mt: 15, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Тип опроса</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select"
              value={optionResourcetype} label="Тип опроса"
              onChange={handleChange} >
              <MenuItem value={1}>Обычный опрос</MenuItem>
              <MenuItem value={2}>Тестовый опрос</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Name />
        <Description />
        {optionResourcetype &&
          <div>{type_poll_components[optionResourcetype]}</div>
        }
        <CreatePollButton />
      </form>
    </Container>
  );
}
export default CreateSelecter;