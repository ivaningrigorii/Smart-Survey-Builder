import { Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import ListQuestions from "./Questions/ListQuestions";
import ConstructorServices from '../../ConstructorServices';

const cs = new ConstructorServices();

const Constructor = ({ typePoll, idPoll, }) => {
    const [questions, setQuestions] = useState();
    const isChangeQuestions = useRef(true);

    useEffect(() => {
        if (!isChangeQuestions.current) { return; }
        else { isChangeQuestions.current = false; };

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
    }, [questions,]);

    return (
        <Box>
            {questions &&
                <ListQuestions idPoll={idPoll} questions={questions} setQuestions={setQuestions} />
            }
        </Box>
    );
};
export default Constructor;