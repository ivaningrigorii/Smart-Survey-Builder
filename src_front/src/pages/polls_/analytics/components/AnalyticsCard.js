import { useState, useCallback, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Grid, IconButton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Poll, Reply, Delete, Edit } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
// import PollsServices from '../PollsServices';
import AnServices from '../AnServices';
import { reverse } from 'named-urls';
import routes from '../../../../routes';
import { useClipboard } from 'use-clipboard-copy';

import { Box, Stack } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

// let theme = createTheme();
// theme = responsiveFontSizes(theme);


const as = new AnServices();

// const Item = styled(Paper)(({ theme }) => ({
//   // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   // ...theme.typography.body2,
//   // padding: theme.spacing(1),
//   // textAlign: 'center',
//   // color: theme.palette.text.secondary,
// }));


const AnalyticsCard = (props) => {
  const idPoll=props.id;
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [questions, setQuestions] = useState();

  useEffect(() => {
    console.log(idPoll);
    // as.getPollOptions(idPoll)
    as.getAll(idPoll)
        .then((result) => {
            // console.log(result);
            //  const res = JSON.parse(JSON.stringify(result));
            //  const res2 = JSON.parse(JSON.stringify(res.results));
            // setName(result.name);
            // console.log(result);
            // console.log(name);
            // console.log(result.results.name);
            // console.log(typeof result.results.name);
            // console.log(name);
            // setDesc(result.description)
            setQuestions(result.results.questions);
            console.log(result.results.questions);
            console.log(questions);
            const json = JSON.parse(JSON.stringify(result.results.questions));
            // const obj = JSON.parse(result.results.questions);
            // const obj2 = JSON.parse(JSON.stringify(obj));
            console.log(json);
            console.log(json);
        })
        .catch((error) => {
            console.log(error);
            alert("Данные невозможно получить!");
        })
}, []);

// const obj = JSON.parse(questions);
// console.log(obj.id); // "John"

  // const clipboard = useClipboard();
  // const url = "http://" + window.location.host + reverse(routes.polls.analytics, { poll: poll.id });
  // console.log(props.id);




  // const handleReloadCards = (event) => {
  //   let result = window.confirm("Вы желаете удалить опрос?");
  //   if (result) {
  //     ps.deletePoll(poll.id)
  //       .then((result) => { handleMake(event) })
  //       .catch((error) => { return false })
  //   }
  // }

 

  return (
   
    <Box>
         {/* <Box>
            {questions &&
                questions.map((question) => {
                    return (
                        <Box key={question.id}>
                            {question}
                        </Box>
                    );
                })}
            <Box sx={{ marginTop: "5vh" }} />
        </Box> */}
        <Typography  marginTop={10}>
            {
            JSON.stringify(questions)}
          </Typography>

          {/* <Typography  marginTop={10}>
            
          {JSON.parse(questions)}
          </Typography> */}

{/* <h2>{questions.text_question}</h2> */}
      {/* <ul>
        {questions.answers.map(answer => (
          <li key={answer}>{answer}</li>
        ))}
      </ul> */}
          {/* <Typography  marginTop={1}>
            {desc}
          </Typography> */} 
       
          {/* <ul>
        {questions.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul> */}
          </Box>


  );
}
export default AnalyticsCard;
