import { useEffect, useState, useRef } from "react";
import ConstructorServices from '../../../ConstructorServices';
import { Box, Stack } from "@mui/material";

import QuestSimple from "./Base/QuestionSimple";
import QuestTestSimpleEv from './Base/QuestionTestSimpleEv';

import CreateQuestion from "./DialogCreateQuestion";


const cs = new ConstructorServices();

const ListQuestions = ({ idPoll,  }) => {

    const [questions, setQuestions] = useState();

    const type_question = (question) => {
        let resourcetype = question.resourcetype;
        if (resourcetype === "QuestionSimple")
            return <QuestSimple key={question.id} question={question} />;
        if (resourcetype === "QuestionTestSimpleEv")
            return <QuestTestSimpleEv key={question.id} question={question} />;
    }

    useEffect(() => {
        console.log(idPoll);
        cs.getAllQuestions(idPoll)
            .then((result) => {
                console.log(result);
                setQuestions(result.results);
            })
            .catch((error) => {
                console.log(error);
                alert("Данные невозможно получить!");
            })
    }, []);

    const createQuestion = (mydata) => {
        mydata.survey = idPoll;
        cs.createQuestion(mydata)
        .then(res => {
            let questions_ = questions.slice(0);
            questions_.push(res);
            setQuestions(questions_);
        })
        .catch(err => {
            alert("Ошибка, значения не были добавлены!");
            console.log(err);
        })
    }

    return (
        <Box>
            {questions &&
            questions.map((question) => {
                return (
                    <Box key={question.id}>
                        {type_question(question)}
                    </Box>
                );
            })}
            <Stack direction="row" justifyContent="center" alignContent="center">
                <CreateQuestion createQuestion={createQuestion}/>
            </Stack>
            
            <Box sx={{marginTop: "5vh"}}/>
        </Box>
    )
}
export default ListQuestions;