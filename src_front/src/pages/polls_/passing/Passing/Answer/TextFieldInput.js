import { FormControlLabel, TextField, } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

const TextFieldInput = ({ answer, setDisableOther, setTextValue, 
        setSelectableValueUp, }) => {

    const [text, setText] = useState();
    const first = useRef(true);

    const handleChangeDisableOther = useCallback((event) => {
        event.target.value !== "" ? setDisableOther(true) : setDisableOther(false);
        setText(event.target.value);
    });

    useEffect(() => {
        if (first == true) {
            first = false;
            return;
        }
        setTextValue(text);
        setSelectableValueUp(answer.id);
    }, [text, ])


    return (
        <FormControlLabel
            key={answer.id}
            control={
                <TextField
                    sx={{ml: "5px", }}
                    size="small"
                    onChange={handleChangeDisableOther}
                    label="введите другой ответ"
                />
            }
        />
    );
}
export default TextFieldInput;