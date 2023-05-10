import {
    Box, Radio,
    Container, Typography,
    RadioGroup, FormControlLabel, TextField, Checkbox, FormGroup,

} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import PassingServices from "../PassingServices";
import { Check, Group } from "@mui/icons-material";
import OneAnsLogic from "./Question/OneAnsLogic";
import ManyAnsLogic from "./Question/ManyAnsLogic";

const ps = new PassingServices();
const SELECTABLE_ANSWERS = ["AnswerSelectableSimple", "AnswerSelectableTest",];
const TEXT_INPUT_ANSWERS = ["AnswerTextInput",];

const GoGoGo = () => {
    const { id_passing } = useParams();
    const [passing_list, setPassingList] = useState();
    const [page, setPage] = useState(1);
    const [data, setData] = useState();

    const [text_values, setTextValues] = useState();
    const [select_value, setSelectValue] = useState();

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    useEffect(() => {
        ps.listQuestions(id_passing, page)
            .then((res) => {
                setPassingList(res);
            })
            .catch((err) => {
                alert("Прохождение невозможно!");
                console.log(err);
            })
    }, []);

    useEffect(() => {

    }, [page,]);

    return (

        <Container>
            <Typography variant="h3">
                Вы проходите опрос
            </Typography>

            {passing_list && passing_list.results.questions.map((question) => {
                return (
                    <Box>
                        <Typography>
                            {question.text_question}
                        </Typography>

                        {question.one_answer_with_a_choice == true ?
                            <OneAnsLogic answers={question.answers} 
                                    taking_survey={id_passing} 
                                    id_question={question.id}
                                    questions={questions}
                                    setQuestions={setQuestions}/> :
                            <ManyAnsLogic answers={question.answers} 
                                    taking_survey={id_passing} id_question={question.id}
                                    questions={questions} setQuestions={setQuestions}
                                    />
                        }
                        {question.option_required_for_pass == true &&
                            <Typography>
                                *Обязательный
                            </Typography>    
                        }
                    </Box>
                );
            })}
        </Container >

    )
}
export default GoGoGo;