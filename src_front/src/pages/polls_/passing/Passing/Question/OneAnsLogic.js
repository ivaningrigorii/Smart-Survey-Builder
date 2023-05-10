import { RadioGroup, TextField, Box, FormControlLabel, Radio, FormControl } from "@mui/material";

import SelectableTextRadio from "../Answer/SelectableTextRadio";
import TextFieldInput from "../Answer/TextFieldInput";
import { useEffect, useState } from "react";


const SELECTABLE_ANSWERS = ["AnswerSelectableSimple", "AnswerSelectableTest",];
const TEXT_INPUT_ANSWERS = ["AnswerTextInput",];

const OneAnsLogic = ({ answers, taking_survey, id_question, questions, setQuestions,}) => {
    const [disable_other, setDisableOther] = useState(false);

    const [selectable_value_up, setSelectableValueUp] = useState();
    const [text_value_, setTextValue] = useState("");

    const [result_answers, setResultAnswers] = useState();

    useEffect(() => {
        let q = questions.filter(quest => quest.id_question != id_question);

        if (result_answers) {
            q.push(result_answers);
        }

        setQuestions(q);
    }, [result_answers,]);

    useEffect(() => {
            let resourcetype;
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].id == selectable_value_up) {
                    resourcetype = answers[i].resourcetype;
                }
            }

            if (disable_other == true) {
                setResultAnswers({
                    id_question: id_question,
                    result_answers: [{
                        resourcetype: "ResultTextInput",
                        input_text: text_value_,
                        answer: selectable_value_up,
                        taking_survey: taking_survey,
                    },]
                });
            } else {
                if (selectable_value_up && resourcetype !== "AnswerTextInput") {
                    setResultAnswers({
                        id_question: id_question,
                        result_answers: [{
                            resourcetype: "ResultSelect",
                            answer: selectable_value_up,
                            taking_survey: taking_survey,
                        },]
                    });
                } else {
                    setResultAnswers()
                }
            }
    }, [selectable_value_up, text_value_,]);

    return (
        <Box>
            <FormControl>
                {answers.map((answer) => {
                    if (SELECTABLE_ANSWERS.includes(answer.resourcetype) == true) {
                        return (
                            <SelectableTextRadio answer={answer} disable_other={disable_other}
                                setSelectableValueUp={setSelectableValueUp}
                                selectable_value_up={selectable_value_up}
                            />
                        );
                    } else if (TEXT_INPUT_ANSWERS.includes(answer.resourcetype) == true) {
                        return (
                            <TextFieldInput answer={answer} setDisableOther={setDisableOther}
                                setTextValue={setTextValue}
                                setSelectableValueUp={setSelectableValueUp}
                            />
                        );
                    }
                })}
            </FormControl>
        </Box>
    );
}
export default OneAnsLogic;