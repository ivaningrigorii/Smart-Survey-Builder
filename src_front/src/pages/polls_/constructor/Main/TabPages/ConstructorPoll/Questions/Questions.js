import { Card, CardContent } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Box, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ConstructorServices from '../../../ConstructorServices';
import ListAnswers from '../Answers/ListAnswers';

const cs = new ConstructorServices();

const QuestSimple = ({ question }) => {
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

    return (
        <Box>
            <Card className={classes.card_style}>
                <CardContent>
                    <p className={classes.header_question}>{question.text_question}</p>
                    {answers &&
                        <ListAnswers answers={answers} 
                        setAnswers={setAnswers} 
                        question={question.id}
                        />
                    }
                </CardContent>
            </Card>
        </Box>
    );
}


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

    return (
        <Box>
            <Card className={classes.card_style} >
                <CardContent>
                    <p className={classes.header_question}>{question.text_question}</p>
                    {answers &&
                        <ListAnswers 
                        answers={answers} 
                        setAnswers={setAnswers} 
                        question={question.id}
                        />
                    }
                </CardContent>
            </Card>
        </Box>
    );
}

const TypesCSS = makeStyles({
    card_style: {
        width: '50vw',
        marginTop: '3vh',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header_question: {
        textAlign: 'center',
    },
});

export { QuestTestSimpleEv, QuestSimple };

