import { useState, useEffect } from 'react';
import AnServices from '../AnServices';

import { Box, Typography } from "@mui/material";
import FormData from 'form-data'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const as = new AnServices();

const AnalyticsNumberPassing = (props) => {
  const idPoll=props.id;

  const [questions, setQuestions] = useState();


  useEffect(() => {
    console.log(idPoll);
    as.getNumberPassing(idPoll)
        .then((result) => {
            setQuestions(result.number_passing);
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
    <Box sx={{ marginLeft: "290px" }}>   
<Typography>
  Всего прошло опрос:{questions}
</Typography>
          </Box>
  );
}
export default AnalyticsNumberPassing;
