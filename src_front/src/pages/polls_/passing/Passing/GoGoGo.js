import {
    Box, Radio,
    Container, Typography,
    RadioGroup, FormControlLabel, TextField, Checkbox, FormGroup, Button,
    Card, Stack, 

} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import PassingServices from "../PassingServices";
import { Check, Group } from "@mui/icons-material";
import OneAnsLogic from "./Question/OneAnsLogic";
import ManyAnsLogic from "./Question/ManyAnsLogic";
import routes from "../../../../routes";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";

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

    const getListSurvey = () => {
        ps.listQuestions(id_passing, page)
            .then((res) => {
                setPassingList(res);
                console.log(res);
            })
            .catch((err) => {
                alert("Прохождение невозможно!");
                console.log(err);
            })
    }

    useEffect(() => {
        getListSurvey();
    }, []);

    useEffect(() => {
        getListSurvey();
    }, [page,]);

    const getJSONPassingPage = () => {
        let questions_src = passing_list.results.questions;
        return new Promise((resolve, reject) => {
            questions_src.map(quest_src => {
                if (quest_src.option_required_for_pass == true) {
                    let find_req_question = false;
                    questions.map(quest => {
                        if (quest.id_question == quest_src.id) {
                            find_req_question = true;
                        }
                    })
                    if (find_req_question == false) {
                        return reject();
                    }
                }

                return resolve({
                    id_passing: id_passing,
                    result_questions: questions,
                })
            });
        })
    }

    const handleNextPage = () => {
        getJSONPassingPage()
            .then((json) => {
                ps.saveAnswer(json)
                    .then((res) => setPage(page + 1))
                    .catch((err) => alert("Выполнение невозможно! " +
                        "Проверьте подключение к интернету!"))
            })
            .catch(err => alert(err.response.data.error))
    }

    const handleEndPassing = () => {
        getJSONPassingPage()
            .then((json) => {
                ps.saveAnswer(json)
                    .then((res) => {
                        ps.passingEnd(id_passing)
                            .then((res) => {
                                alert("Вы прошли опрос!");
                                window.location.replace(routes.home);
                            })
                            .catch((err) => {
                                alert(err.response.data.error);
                                console.log(err);
                            })
                    })
                    .catch((err) => alert("Выполнение невозможно! " +
                        "Проверьте подключение к интернету!"))
            })
            .catch(err => alert("Вы заполнили не все обязательные поля!"))
    }

    return (
        <Box sx={{ backgroundColor: "  #ddfae4  " }}>
            <Header />
            <Container sx={{ mt: 5, minHeight: "120vh", }}>

                {passing_list &&
                    <Typography variant="h3" sx={{ mt: "10", }}>
                        {passing_list.results.name}
                    </Typography>
                }

                {passing_list && passing_list.results.questions.map((question) => {
                    return (

                        <Box sx={{ mt: "10px", }}>
                            <Typography>
                                <b>{question.text_question}</b>
                            </Typography>

                            <Card sx={{ backgroundColor: " #f1fdd8 ", borderRadius: "25px", maxWidth:"55vw", }}>
                                <FormGroup aria-setsize="small" sx={{ml: "10px"}}>
                                    {question.one_answer_with_a_choice == true ?
                                        <OneAnsLogic answers={question.answers}
                                            taking_survey={id_passing}
                                            id_question={question.id}
                                            questions={questions}
                                            setQuestions={setQuestions} /> :
                                        <ManyAnsLogic answers={question.answers}
                                            taking_survey={id_passing} id_question={question.id}
                                            questions={questions} setQuestions={setQuestions}
                                        />
                                    }
                                </FormGroup>


                                <Box sx={{ mt: "2vh", }} />

                            </Card>

                            {question.option_required_for_pass == true &&
                                <Typography>
                                    *Обязательный
                                </Typography>
                            }
                        </Box>
                    );
                })}
                <Stack direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    {(passing_list && passing_list.next) &&
                        <Button variant="contained" color="success" onClick={handleNextPage}>
                            Сохранить и продолжить
                        </Button>
                    }
                    {(passing_list && !passing_list.next) &&
                        <Button variant="contained" color="success" onClick={handleEndPassing}>
                            Завершить прохождение
                        </Button>
                    }
                </Stack>

            </Container >
            <Footer />
        </Box>



    )
}
export default GoGoGo;