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

    const deleteOneAnswer = (id) => {
        cs.delAnswer(id)
            .then((res) => {
                let data_ = data__;
                for (let i = 0; i < data_.length; i++) {
                    if (data_[i].id == id) {
                        delete data_[i];
                        break;
                    }
                }
                setData__(data_);
                setFront(get_front());
            })
            .catch((res) => alert("Ошибка"));
    }

    const changeAnswer = (mydata) => {
        cs.changeAnswer(mydata)
            .then((res) => {
                let data_ = data__;
                for (let i = 0; i < data_.length; i++) {
                    if (data_[i].id == mydata.id) {
                        data_[i] = res;
                        setData__(data_);
                        break;
                    }
                }
                setFront(get_front());
            })
            .catch((err) => alert("ошибка"))
    }

    const createAnswer = (default_variat) => {
        default_variat.question = question;
        cs.addAnswer(default_variat)
            .then((res) => {
                let mydata = data__;
                mydata.push(res);
                setData__(mydata);
                setFront(get_front());
            })
            .catch((err) => alert("ошибочка"))
    }


    const type_answer = (answer) => {
        let resourcetype = answer.resourcetype;

        if (resourcetype === "AnswerSelectableSimple")
            return <ASelectableSimple key={answer.id} answer={answer} 
            deleteOneAnswer={deleteOneAnswer} 
            changeAnswer={changeAnswer}/>;
        if (resourcetype === "AnswerSelectableTest")
            return <ASelectableTest key={answer.id} answer={answer} 
            deleteOneAnswer={deleteOneAnswer} 
            changeAnswer={changeAnswer}/>;
        if (resourcetype === "AnswerTextInput")
            return <ATextInput key={answer.id} answer={answer} 
            deleteOneAnswer={deleteOneAnswer} 
            changeAnswer={changeAnswer}/>;
    }

    return (
        <Box>
            {front_anwers}
            <Stack justifyContent="center">
                <CreateAnswer createAnswer={createAnswer} />
            </Stack>
            
        </Box>
    )
}
export default ListAnswers;