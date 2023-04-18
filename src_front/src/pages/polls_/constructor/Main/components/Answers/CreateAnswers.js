
import React, { useState, } from 'react';
import { ASSimple, ASTest, ATInput } from '../Answers/Answers';
import {
  FormControl, TextField,
  Autocomplete, Grid, Container,
  FormLabel, InputLabel, Select, MenuItem,
} from '@mui/material';
import ServicesCreateAnswer from '../Answers/ServicesCreateAnswer';
import { reverse } from 'named-urls';
import Text from "./custom_mui/TextAnswer";
import CreateAnswerButton from "./custom_mui/CreateAnswerButton";


const createAnswerServices = new ServicesCreateAnswer();



const CreateAnswers = (props) => {
  const [optionResourcetype, setOptionResourcetype] = useState(1);
  const [data, setData] = useState({});

  const type_question_components = {
    1: <ASSimple data={data} setData={setData} />,
    2: <ASTest data={data} setData={setData} />,
    3: < ATInput data={data} setData={setData} />
  };

  // var pathArray = window.location.pathname.split('/');
  // var preLastPath = pathArray[pathArray.length - 2];
    
  const handleChange = (event) => {
    setOptionResourcetype(event.target.value);
  };

  const [id_question, setIdQuestion] = useState(JSON.parse(localStorage.getItem('id_question')));

  console.log(id_question);

  const handleSubmit = (event, selectedOption) => {
    event.preventDefault();
    let data_ = data;
    data_.id_question = id_question;
    console.log(id_question);

    
    setData(data_);

    createAnswerServices.createAnswer(data)
      .then((result) => {       
        console.log(result.id);
        // window.location.replace(reverse(routes.polls.constructor, { poll: result.id }));
      })
      .catch((exp) => {
        console.log(exp);
        alert("ответ не был создан, проверьте введённые данные!");
      })
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
     
      {/* <QuestionForPoll survey={preLastPath} />; */}
      <Grid container direction="column" alignItems="center">
          <FormControl sx={{ mt: 15, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Тип ответа</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select"
              value={optionResourcetype} label="Тип вопроса"
              onChange={handleChange} >
              <MenuItem value={1}>Обычный ответ</MenuItem>
              <MenuItem value={2}>Тестовый ответ</MenuItem>
              <MenuItem value={3}>Текстовый ответ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {optionResourcetype &&
          <div>{type_question_components[optionResourcetype]}</div>
        }
        <CreateAnswerButton />
      </form>
    </Container>
  );
}
export default CreateAnswers;