import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _token from '../../../../../AxiosTokens';

function  QuestionForPoll(props) {

  const [questions, setQuestions] = useState([]);
///не исп

  useEffect(() => {
    axios.get(`api/v1/manage/quest/question/`, 
    {params: {
       survey: `${props.survey}`
      },
      
        headers: {
        'Authorization': 'Bearer ' + _token(),
    },})
      .then(response => setQuestions(response.data))
      .catch(error => console.error(error));
  }, [props.survey]);

  return (
    <div>
      {questions.map(question => (
        <div key={question.id}>
          <h2>{question.id}</h2>
          <p>{question.text_question}</p>
        </div>
      ))}
    </div>
  );
}


export default QuestionForPoll;