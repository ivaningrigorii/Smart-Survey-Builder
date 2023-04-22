import { Card, CardContent, Box, } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useEffect, useRef, useState } from 'react';

import ConstructorServices from '../../../../ConstructorServices';
import { TypesCSS } from '../style';
import GetTypeAnswer from './GetTypeAnswer';

const cs = new ConstructorServices();

const QuestTestSimpleEv = ({ question }) => {
    const classes = TypesCSS();
    const [answers, setAnswers] = useState();
    const isChangeAnswer = useRef(true);

    useEffect(() => {
        if (!isChangeAnswer.current) { return; }
        else { isChangeAnswer.current = false; };
        
        cs.getAllAnswers(question.id)
            .then((result) => {
                setAnswers(result.results);
            })
            .catch((error) => {
                console.log(error);
                alert("Данные невозможно получить!");
            })
    }, [answers,]);

    const deleteAnswer = () => {
        delete answers[0];
    }

    return (
        <Box>
            <Card className={classes.card_style} >
                <CardContent>
                    <p className={classes.header_question}>{question.text_question}</p>
                    {answers && 
                    answers.map((answer)=>{
                        return GetTypeAnswer(answer, deleteAnswer);
                    })}
                </CardContent>
            </Card>
        </Box>
    );
}
export default QuestTestSimpleEv;
