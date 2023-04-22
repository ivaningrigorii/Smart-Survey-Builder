import { Card, CardContent, Box, Stack, } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useCallback, useEffect, useRef, useState, } from 'react';

import ConstructorServices from '../../../../ConstructorServices';
import { TypesCSS } from '../style';
import GetTypeAnswer from './GetTypeAnswer';

import CreateAnswer from '../../Answers/DialogCreateAnswer';

import _token from '../../../../../../../../AxiosTokens';

const allow_fields_adding = [
    "AnswerTextInput",
    "AnswerSelectableSimple",
];

const cs = new ConstructorServices();

const QuestSimple = ({ question }) => {
    const classes = TypesCSS();
    const [answers, setAnswers] = useState();
    const [allow_fields, setAllowFields] = useState();

    const analizeQuestionAnswers = () => {
        let fields = allow_fields_adding.slice(0);

        if (answers.find(answer => answer.resourcetype === "AnswerTextInput"))
            fields = fields.filter(field => field != "AnswerTextInput");

        if (answers.find((answer) => answer.resourcetype === "AnswerSelectableSimple"))
            fields = fields.filter(field => field != "AnswerSelectableTest");

        setAllowFields(fields);
    };


    useEffect(() => {
        cs.getAllAnswers(question.id)
            .then((result) => {
                setAnswers(result.results);
            })
            .catch((error) => {
                alert("Данные невозможно получить!");
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (answers)
            analizeQuestionAnswers();
    }, [answers,]);

    useEffect(() => {
        console.log("изменили");
    }, [allow_fields,])

    const deleteAnswer = id => {
        cs.delAnswer(id)
            .then((res) => {
                setAnswers(answers.filter(answer => answer.id != id));
            })
            .catch((exp) => alert("Удаление невозможно!"))
    };

    const createAnswer = mydata => {
        mydata.question = question.id;
        cs.addAnswer(mydata)
            .then((answer) => {
                answers.push(answer);
                setAnswers(answers.slice(0));
            })
            .catch((exp) => {
                alert("Добавление невозможно, ошибка!");
                console.log(exp);
            });
    };

    return (
        <Box>
            <Card className={classes.card_style}>
                <CardContent>
                    <p className={classes.header_question}>{question.text_question}</p>
                    {answers &&
                        answers.map((answer) => {
                            return GetTypeAnswer({ answer, deleteAnswer, });
                        })}
                    <Stack container justifyContent="center">
                        <CreateAnswer createAnswer={createAnswer} allow_fields={allow_fields} />
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
export default QuestSimple;