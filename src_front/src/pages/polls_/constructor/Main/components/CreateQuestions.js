
import React, { useState, } from 'react';
import { SQSimple, SQTest} from './Questions';
import {
  FormControl, TextField,
  Autocomplete, Grid, Container,
  FormLabel, InputLabel, Select, MenuItem,
} from '@mui/material';
import ServicesCreateQuestion from '../ServicesCreateQuestion';
import routes from '../../../../../routes';
import { reverse } from 'named-urls';
import TextQuestion from "./custom_mui/TextQuestion";
import CreateQuestionButton from "./custom_mui/CreateQuestionButton";
import TypeAnswer from "./custom_mui/TypeAnswer";
import QuestionForPoll from './QuestionForPoll';
import QuestionAll from "./custom_mui/QuestionAll";
const createQuestionServices = new ServicesCreateQuestion();



const CreateQuestions = () => {
  const [optionResourcetype, setOptionResourcetype] = useState(1);
  const [data, setData] = useState({});

  const type_question_components = {
    1: <SQSimple data={data} setData={setData} />,
    2: <SQTest data={data} setData={setData} />
  };

  var pathArray = window.location.pathname.split('/');
  var preLastPath = pathArray[pathArray.length - 2];
    
  const handleChange = (event) => {
    setOptionResourcetype(event.target.value);
  };


  const [position_survey, setPositionSurvey] = useState(JSON.parse(localStorage.getItem('position_survey')));
  const [id_question, setIdQuestion] = useState(0);

 

  const handleSubmit = (event, selectedOption) => {
    event.preventDefault();

    let data_ = data;
    data_.text_question = event.target.text_question.value;
    data_.one_answer_with_a_choice = event.target.one_answer_with_a_choice.value;
    data_.survey =preLastPath;
    data_.position_survey = position_survey+1;
    console.log(position_survey);
    
    
    setData(data_);

    createQuestionServices.createQuestion(data)
      .then((result) => {       
        setPositionSurvey(position_survey + 1);
        // Сохраняем переменную в локальное хранилище
localStorage.setItem('position_survey', JSON.stringify(position_survey));
        setIdQuestion(result.id)
        // window.location.replace(reverse(routes.polls.constructor, { poll: result.id }));
      })
      .catch((exp) => {
        console.log(exp);
        alert("Вопрос не был создан, проверьте введённые данные!");
      })
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
     
      {/* <QuestionForPoll survey={preLastPath} />; */}
      <Grid container direction="column" alignItems="center">
          <FormControl sx={{ mt: 15, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Тип вопроса</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select"
              value={optionResourcetype} label="Тип вопроса"
              onChange={handleChange} >
              <MenuItem value={1}>Обычный вопрос</MenuItem>
              <MenuItem value={2}>Тестовый вопрос</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {optionResourcetype &&
          <div>{type_question_components[optionResourcetype]}</div>
        }
        <TextQuestion/>
        <TypeAnswer defaultTrue={true} trueLabel="Да" falseLabel="Нет" />
        <QuestionAll count={position_survey} />
        <CreateQuestionButton />
      </form>
    </Container>
  );
}
export default CreateQuestions;