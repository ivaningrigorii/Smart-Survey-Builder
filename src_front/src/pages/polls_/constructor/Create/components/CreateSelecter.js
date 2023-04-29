import Description from './custom_mui/Description';
import Name from './custom_mui/Name';
import React, { useState, } from 'react';
import { SSimple, STest } from './Polls';
import {
  FormControl, TextField,
  Autocomplete, Grid, Container,
  FormLabel, InputLabel, Select, MenuItem, Button,
  Stack,
} from '@mui/material';
import CreatePollButton from './custom_mui/CreatePollButton';
import ServicesCreatePage from '../ServicesCreatePage';
import routes from '../../../../../routes';
import { reverse } from 'named-urls';

const createPageServices = new ServicesCreatePage();                 /////option_is_published  публикация



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
        localStorage.setItem('position_survey', JSON.stringify(0));
        localStorage.setItem('type_of_surv', JSON.stringify(optionResourcetype));
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

        <Stack direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          <FormControl sx={{ mt: 10, minWidth: 120, maxLength: 400, }}>
            <InputLabel id="demo-simple-select-label" sx={{ maxLength: 400, }}>Тип опроса</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select"
              value={optionResourcetype} label="Тип опроса"
              onChange={handleChange} sx={{ maxLength: 400, }}>
              <MenuItem value={1}>Обычный опрос</MenuItem>
              <MenuItem value={2}>Тестовый опрос</MenuItem>
            </Select>
          </FormControl>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Добавить фото-обложку
            </Button>
          </label>

        </Stack>





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