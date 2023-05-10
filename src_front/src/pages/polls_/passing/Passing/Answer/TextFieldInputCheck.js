import { FormControlLabel, TextField, } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

const TextFieldInputCheck = ({ answer, setDisableOther, setTextValue,
    setSelectableValueUp, selectable_values_up, }) => {

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
        if (text && text !== "") {
            setSelectableValueUp([answer.id,]);
        } else {
            let res = selectable_values_up.filter(a_id => a_id != answer.id);
            setSelectableValueUp(res);
        }

    }, [text,])


    return (
        <FormControlLabel
            key={answer.id}
            control={
                <TextField
                    sx={{ ml: "5px", }}
                    size="small"
                    onChange={handleChangeDisableOther}
                    label="введите другой ответ"
                />
            }
        />
    );
}
export default TextFieldInputCheck;