import { useState, useEffect } from 'react';
import AnServices from '../AnServices';

import { Box } from "@mui/material";
import FormData from 'form-data'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const as = new AnServices();

const AnalyticsCard = (props) => {
  const idPoll=props.id;
  const idQuestion=props.id_qw;
  const [questions, setQuestions] = useState();
  const [data, setData] = useState(new FormData());

  useEffect(() => {
    console.log(idPoll);
    console.log(idQuestion);
    var data_ = data;
    data_.append('survey', idPoll);
    data_.append('question', idQuestion);
 
    setData(data_);
    as.postPollAnalize(data)
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

const COLORS = ['#0088FE', '#00C49F', 'violet', '#FF8042'];
 
  return ( 
    <Box sx={{ marginLeft: "150px" }}>   
          <PieChart width={600} height={400}>
      <Pie
        dataKey="count"
        isAnimationActive={false}
        data={questions}
        cx={300}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        labelLine={false}
        label={({ text, count }) => `${text ? text : "Другое"}: ${count}`} 
      >
        {questions&&questions.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
          </Box>
  );
}
export default AnalyticsCard;
