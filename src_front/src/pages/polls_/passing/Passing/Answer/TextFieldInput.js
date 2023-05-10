import { FormControlLabel, TextField, Card, CardActionArea, CardContent, } from "@mui/material";
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
    }, [text,])


    return (
        <Card sx={{ marginTop: '2vh',  minWidth: "50vw", }}>
            <CardActionArea>
                <FormControlLabel
                    key={answer.id}
                    control={
                        <TextField
                            variant="standard"
                            sx={{ ml: "20px", minWidth: "50vw" }}
                            size="small"
                            onChange={handleChangeDisableOther}
                            label="Другое"
                        />
                    }
                />
            </CardActionArea>
        </Card>
    );
}
export default TextFieldInput;