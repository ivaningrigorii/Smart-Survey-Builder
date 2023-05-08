import Description from './custom_mui/Description';
import Name from './custom_mui/Name';
import React, { useState, useEffect } from 'react';
import { SSimple, STest } from './Polls';
import {
  FormControl, Container,
  InputLabel, Select, MenuItem, Button,
  Stack, Box, Typography,
} from '@mui/material';
import CreatePollButton from './custom_mui/CreatePollButton';
import ServicesCreatePage from '../ServicesCreatePage';
import routes from '../../../../../routes';
import { reverse } from 'named-urls';
import FormData from 'form-data';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


const createPageServices = new ServicesCreatePage();



const CreateSelecter = () => {
  const [optionResourcetype, setOptionResourcetype] = useState(1);
  const [data, setData] = useState(new FormData());
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();

  const type_poll_components = {
    1: <SSimple data={data} setData={setData} />,
    2: <STest data={data} setData={setData} />
  };

  useEffect(() => {
    if (img) {
      const objectUrl = URL.createObjectURL(img)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
    }

  }, [img,])

  const handleChange = (event) => {
    setOptionResourcetype(event.target.value);
  };

  const handleSubmit = (event, selectedOption) => {
    event.preventDefault();

    var data_ = data;

    if (img) {
      data_.append('img', img, img.name);
    }

    if (event.target.name.value) {
      data_.append('name', event.target.name.value);
    } else {
      alert("Название опроса обязательно надо ввести!");
      return;
    }

    if (event.target.description.value) {
      data_.append('description', event.target.description.value);
    }

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
    <Container
      sx={{
        minHeight: "120vh",
      }}
    >
      <Box
        textAlign="center"
        sx={{
          backgroundColor: " white ",
          mt: "10vh",
          mx: 20,
          borderRadius: "20px",
          minHeight: "80vh"
        }}
      >
        <Typography color=" #ef5b7f " variant="h6"
          sx={{ mt: "10px", }} textAlign="center"
          justifyContent="center">
          <b>Создание опроса</b>
        </Typography>
        <Box sx={{
          mx: "10px",
          mt: "10px",
          height: "fit-content",
        }}>
          <form onSubmit={handleSubmit}>
            <Stack container
              direction="row"
              justifyContent="space-between"
              alignItems="base-line"
            >

              <Stack container
                direction="column"
                justifyContent="center"
                alignItems="flex-start">
                <Box
                  sx={{
                    width: { xs: 300, },
                    height: { xs: 150, },
                    borderRadius: "25px",
                    backgroundColor: " #e4e4e2 ",
                  }}>
                  {img &&
                    <Box sx={{ mx: "auto", }}>
                      <Box
                        component="img"
                        sx={{
                          width: { xs: 300, },
                          maxHeight: { xs: 150, },
                          maxWidth: { xs: 300, },
                          borderRadius: "25px",
                          objectFit: "cover",
                        }}
                        src={preview}
                      />
                    </Box>
                  }
                </Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  name="raised_button_file"
                  onChange={(event) => setImg(event.target.files[0])}
                />
                {img ?
                  <label htmlFor="raised-button-file">
                    <Button component="span">
                      Изменить
                    </Button>
                  </label> :
                  <label htmlFor="raised-button-file">
                    <Button component="span">
                      Обложка
                    </Button>
                  </label>
                }

              </Stack>

              <FormControl sx={{ minWidth: 120, maxLength: 400, }} size="small">
                <InputLabel id="demo-simple-select-label" sx={{ maxLength: 400, }} size="small">
                  Тип опроса
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" size="small"
                  value={optionResourcetype} label="Тип опроса"
                  onChange={handleChange} sx={{ maxLength: 400, }}>
                  <MenuItem value={1}>Обычный опрос</MenuItem>
                  <MenuItem value={2}>Тестовый опрос</MenuItem>
                </Select>
              </FormControl>

            </Stack>

            <Name />
            <Description />
            {optionResourcetype &&
              <div>{type_poll_components[optionResourcetype]}</div>
            }
            <CreatePollButton />
          </form>
        </Box>
      </Box>
    </Container>
  );
}
export default CreateSelecter;