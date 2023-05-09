import {
    Box, Radio,
    Container, Typography,
    RadioGroup, FormControlLabel, TextField, Checkbox, FormGroup,

} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import PassingServices from "../PassingServices";
import { Check, Group } from "@mui/icons-material";

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

    useEffect(() => {
        ps.listQuestions(id_passing, page)
            .then((res) => setPassingList(res))
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
                            <RadioGroup >
                                {question.answers.map((answer) => {
                                    if (SELECTABLE_ANSWERS.indexOf(answer.resourcetype) >= 0) {
                                        return (
                                            <FormControlLabel
                                                key={answer.id}
                                                value={answer.id}
                                                label={answer.text}
                                                control={<Radio />}
                                            />
                                        );
                                    }
                                    if (TEXT_INPUT_ANSWERS.indexOf(answer.resourcetype) >= 0) {
                                        return (
                                            <FormControlLabel
                                                key={answer.id}
                                                control={<TextField size="small" />}
                                            />
                                        );
                                    }
                                })}
                            </RadioGroup> :
                            <FormGroup>{
                                question.answers.map((answer) => {
                                    if (SELECTABLE_ANSWERS.indexOf(answer.resourcetype) >= 0) {
                                        return (
                                            <FormControlLabel
                                                value={answer.id}
                                                label={answer.text}
                                                control={<Checkbox />}
                                            />
                                        );
                                    }
                                    if (TEXT_INPUT_ANSWERS.indexOf(answer.resourcetype) >= 0) {
                                        return (
                                            <FormControlLabel
                                                control={<TextField size="small" />}
                                            />
                                        );
                                    }
                                })
                            }</FormGroup>
                        }
                    </Box>
                );
            })}
        </Container >

    )
}
export default GoGoGo;