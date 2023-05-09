import { useState, useEffect } from 'react';
import AnServices from '../AnServices';

import { Box, Typography } from "@mui/material";
import FormData from 'form-data'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const as = new AnServices();

const AnalyticsTextAnswers = (props) => {
  const id=props.id;

  const [questions, setQuestions] = useState();


  useEffect(() => {
    console.log(id);
    as.getTextAnswers(id)
        .then((result) => {
            setQuestions(result);
            console.log(result);
            console.log(questions);
        })
        .catch((error) => {
            console.log(error);
            alert("Данные невозможно получить!");
        })
}, []);

useEffect(() => {
  console.log(questions);
}, [questions]);

  return ( 
 <Box sx={{ marginLeft: "10px" }}>   
<Typography variant="h5">
  Ответы текстом: 
  {questions && Object.keys(questions).map((key) => (
    <div key={key}>
      <Typography variant="h6">
        {[key]}:{questions[key]}
      </Typography>
    </div>
  ))}
</Typography>
</Box> 
  );
}
export default AnalyticsTextAnswers;
