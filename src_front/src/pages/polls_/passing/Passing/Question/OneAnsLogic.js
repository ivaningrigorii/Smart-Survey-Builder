import { RadioGroup, TextField, Box, FormControlLabel, Radio } from "@mui/material";
import SelectableTextRadio from "../Answer/SelectableTextRadio";
import TextFieldInput from "../Answer/TextFieldInput";

const SELECTABLE_ANSWERS = ["AnswerSelectableSimple", "AnswerSelectableTest",];
const TEXT_INPUT_ANSWERS = ["AnswerTextInput",];

const OneAnsLogic = ({ answers, }) => {
    return (
        <Box>
            <RadioGroup >
                {answers.map((answer) => {
                    if (SELECTABLE_ANSWERS.includes(answer.resourcetype) == true) {
                        return (
                            <FormControlLabel
                                key={answer.id}
                                control={<Radio defaultValue={false}/>}
                                label={answer.text}
                            />
                        );

                    } else if (TEXT_INPUT_ANSWERS.includes(answer.resourcetype) == true) {
                        return (
                            <FormControlLabel
                                key={answer.id}
                                control={<TextField />}
                            />
                        );

                    }

                })}
            </RadioGroup>
        </Box>
    );
}
export default OneAnsLogic;