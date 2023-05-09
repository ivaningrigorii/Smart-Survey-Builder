import {
    Box, Radio,
    Container, Typography,
    RadioGroup, FormControlLabel, TextField,

} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import PassingServices from "../PassingServices";

import OneAnsLogic from "./Question/OneAnsLogic";
import ManyAnsLogic from "./Question/ManyAnsLogic";

const ps = new PassingServices();

const GoGoGo = () => {
    const { id_passing } = useParams();
    const [passing_list, setPassingList] = useState();
    const [page, setPage] = useState(1);
    const [data, setData] = useState();

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
                            <OneAnsLogic answers={question.answers}/> :
                            <ManyAnsLogic />
                        }
                    </Box>
                );
            })}
        </Container>

    )
}
export default GoGoGo;