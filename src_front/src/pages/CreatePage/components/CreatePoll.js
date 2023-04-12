import React from 'react';
import ChangeTypeOfPoll from './ChangeTypeOfPoll';
import CreatePollButton from './CreatePollButton';
import Name from './Name';
import Description from './Description';

function CreatePoll() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      description: event.target.description.value,
      // resourcetype: event.target.resourcetype.value,
      start_time: event.target.start_time.value,
      end_time: event.target.end_time.value,
      time_passing: event.target.time_passing.value
    };
  
    fetch('http://localhost:8000/api/v1/manage/surv/survey-header/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  
  return (
  
    <form onSubmit={handleSubmit}>
      <Name/>
      <Description/>          
        <ChangeTypeOfPoll/>      
    <CreatePollButton/>
  </form>
  
  );
}

export default CreatePoll;