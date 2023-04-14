import React from 'react';
import ChangeTypeOfPoll from './ChangeTypeOfPoll';
import CreatePollButton from './CreatePollButton';
import Name from './Name';
import Description from './Description';
import axios from 'axios';
import _token from '../../../AxiosTokens';
function CreatePoll() {


  const DeterminePollTypeFromAutocomplete = function (res) {
    if (res === 'Обычный опрос')
      return "SurveySimple";
    if (res === 'Тестовый опрос')
      return "SurveyTest";
  }
  const handleSubmit = (event, selectedOption) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      description: event.target.description.value,
      resourcetype: DeterminePollTypeFromAutocomplete(event.target.resourcetype.value),
      start_time: event.target.start_time.value,
      end_time: event.target.end_time.value,
      time_passing: event.target.time_passing.value
    };
    console.log(event.target.name.value);
    console.log(event.target.description.value);
    console.log(DeterminePollTypeFromAutocomplete(event.target.resourcetype.value));
    console.log(event.target.start_time.value);
    console.log(event.target.end_time.value);
    console.log(event.target.time_passing.value);

    axios.post('api/v1/manage/surv/survey-header/', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': _token(),
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };



  return (

    <form onSubmit={handleSubmit}>
      <Name />
      <Description />
      <ChangeTypeOfPoll />
      <CreatePollButton />
    </form>

  );
}

export default CreatePoll;