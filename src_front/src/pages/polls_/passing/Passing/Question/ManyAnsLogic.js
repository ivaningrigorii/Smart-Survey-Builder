import { RadioGroup, TextField, Box, FormControlLabel, Radio, FormControl } from "@mui/material";

import SelectableTextChecked from "../Answer/SelectableTextChecked";
import TextFieldInputCheck from "../Answer/TextFieldInputCheck";
import { useEffect, useState } from "react";

const SELECTABLE_ANSWERS = ["AnswerSelectableSimple", "AnswerSelectableTest",];
const TEXT_INPUT_ANSWERS = ["AnswerTextInput",];

const ManyAnsLogic = ({ answers, taking_survey, id_question, questions, setQuestions,}) => {
    const [disable_other, setDisableOther] = useState(false);

    const [selectable_values_up, setSelectableValuesUp] = useState([]);
    const [text_value_, setTextValue] = useState("");


    const [result_answers, setResultAnswers] = useState();

    useEffect(() => {
        let q = questions.filter(quest => quest.id_question != id_question);

        if (result_answers) {
            q.push(result_answers);
        } 
        
        setQuestions(q);
    }, [result_answers, ]);

    useEffect(() => {
        let resourcetypes = selectable_values_up.map((selectable_value_up) => {
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].id == selectable_value_up) {
                    return answers[i].resourcetype;
                }
            }
        });

        if (disable_other == true) {
            setResultAnswers({
                id_question: id_question,
                result_answers: [{
                    resourcetype: "ResultTextInput",
                    input_text: text_value_,
                    answer: selectable_values_up[0],
                    taking_survey: taking_survey,
                },]
            });
        } else {
            if (selectable_values_up &&
                selectable_values_up.length > 0 && resourcetypes[0] !== "AnswerTextInput") {
                setResultAnswers({
                    id_question: id_question,
                    result_answers: selectable_values_up.map((selectable_value_up, index) => {
                        return {
                            resourcetype: "ResultSelect",
                            answer: selectable_value_up,
                            taking_survey: taking_survey,
                        };
                    })
                });
            } else {
                setResultAnswers()
            }
        }
    }, [selectable_values_up, text_value_,]);

    return (
        <Box>
            <FormControl>
                {answers.map((answer) => {
                    if (SELECTABLE_ANSWERS.includes(answer.resourcetype) == true) {
                        return (
                            <SelectableTextChecked answer={answer} disable_other={disable_other}
                                setSelectableValueUp={setSelectableValuesUp}
                                selectable_value_up={selectable_values_up} 
                                />
                        );
                    } else if (TEXT_INPUT_ANSWERS.includes(answer.resourcetype) == true) {
                        return (
                            <TextFieldInputCheck answer={answer} setDisableOther={setDisableOther}
                                setTextValue={setTextValue}
                                setSelectableValueUp={setSelectableValuesUp}
                                selectable_values_up={selectable_values_up} 
                                />
                        );
                    }
                })}
            </FormControl>
        </Box>
    );
}
export default ManyAnsLogic;