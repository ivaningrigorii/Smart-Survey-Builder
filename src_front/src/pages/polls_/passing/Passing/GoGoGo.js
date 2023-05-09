import {
    Box, Radio,
    Container, Typography,
    RadioGroup, FormControlLabel, TextField,

} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import PassingServices from "../PassingServices";
import { Check } from "@mui/icons-material";

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

                //вывод данных
                if (question.one_answer_with_a_choice == true) {
                    return (
                        <Box>
                            <RadioGroup >
                                <Typography>
                                    {question.text_question}
                                </Typography>
                                {question.answers.map((answer) => {
                                    if (SELECTABLE_ANSWERS.indexOf(answer.resourcetype) >= 0) {
                                        return (
                                            <FormControlLabel
                                                value={answer.id}
                                                label={answer.text}
                                                control={<Radio />}
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
                                })}
                            </RadioGroup>
                        </Box>
                    );
                    //вывод данных
                    if (question.one_answer_with_a_choice == false) {
                        return (
                            <Box>
                                    <Typography>
                                        {question.text_question}
                                    </Typography>
                                    {question.answers.map((answer) => {
                                        if (SELECTABLE_ANSWERS.indexOf(answer.resourcetype) >= 0) {
                                            return (
                                                <FormControlLabel
                                                    value={answer.id}
                                                    label={answer.text}
                                                    control={<Check />}
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
                                    })}
                            </Box>
                        );
                    }
                }
            })}
        </Container>

    )
}
export default GoGoGo;