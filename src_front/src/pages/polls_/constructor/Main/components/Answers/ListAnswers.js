import { useEffect, useState, useRef, useCallback } from "react";
import ConstructorServices from "../../ConstructorServices";
import { Box, IconButton, Stack } from "@mui/material";
import { ATextInput, ASelectableSimple, ASelectableTest } from "./Answers";
import CreateAnswer from "./DialogCreateAnswer";

const cs = new ConstructorServices();



const ListAnswers = ({ answers, setAnswers, question, }) => {

    const [data__, setData__] = useState(answers);
    const [front_anwers, setFront] = useState();
    const isChange = useRef(true);

    const get_front = () => {
        return (
            <Box>
                {answers.map((data__) => {
                    return (
                        <Box>
                            {type_answer(data__)}
                        </Box>
                    );
                })}
            </Box>
        );
    }

    useEffect(() => {
        setFront(get_front());
    }, [data__,]);

    useEffect(() => {
        if (!isChange.current) { return; }
        else { isChange.current = false; };
        setFront(get_front());
    }, []);


    const handleInputChange = useCallback(event => {
        event.preventDefault();
        setAnswers(data__);
    });

    const deleteOneAnswer = (event, id) => {
        event.preventDefault();
        cs.delAnswer(id)
            .then((res) => {
                setData__(answers.filter((ans) => { if (ans.id != id) return ans; }));
            })
            .catch((res) => alert("Ошибка"));
    }

    const changeAnswer = (event, id, data) => {
        event.preventDefault();
        cs.changeAnswer(data)
            .then((res) => {
                let data_ = answers;
                for (let i = 0; i < data_.length; i++) {
                    if (data_[i].id == id) {
                        data_[i] = data;
                        setData__(data_);
                        handleInputChange();
                        return;
                    }
                }
            })
            .catch((err) => alert("ошибка"))
    }

    const createAnswer = (event, default_variat) => {
        event.preventDefault();
        default_variat.question = question;
        cs.addAnswer(default_variat)
            .then((res) => {
                let mydata = data__;
                mydata.push(res);
                setData__(mydata);
                console.log(data__);
            })
            .catch((err) => alert("ошибочка"))
    }


    const type_answer = (answer) => {
        let resourcetype = answer.resourcetype;

        if (resourcetype === "AnswerSelectableSimple")
            return <ASelectableSimple key={answer.id} answer={answer} deleteOneAnswer={deleteOneAnswer} />;
        if (resourcetype === "AnswerSelectableTest")
            return <ASelectableTest key={answer.id} answer={answer} deleteOneAnswer={deleteOneAnswer} />;
        if (resourcetype === "AnswerTextInput")
            return <ATextInput key={answer.id} answer={answer} deleteOneAnswer={deleteOneAnswer} />;
    }

    return (
        <Box>
            {front_anwers}
            <CreateAnswer
                createAnswer={createAnswer} />
        </Box>
    )
}
export default ListAnswers;