import { FormControlLabel, Radio, Box, FormControl, Card, CardActionArea, CardContent, } from "@mui/material";
import { useEffect, useState } from "react";

const SelectableTextRadio = ({ answer, disable_other,
    setSelectableValueUp, selectable_value_up, }) => {

    const [val, setVal] = useState(false);

    useEffect(() => {
        if (disable_other == true) {
            setVal(false);
        }
    }, [disable_other]);

    useEffect(() => {
        if (selectable_value_up != answer.id) {
            setVal(false);
        }
    }, [selectable_value_up,]);

    useEffect(() => {
        if (val == true) {
            setSelectableValueUp(answer.id);
        }
    }, [val,]);

    const handleChangeVal = () => {
        if (disable_other == false) {
            val == true ? setVal(false) : setVal(true);
        }
    }

    return (
        <Card sx={{ marginTop: '2vh', minWidth: "50vw", }}>
            <CardActionArea onClick={handleChangeVal}>
                {(disable_other == true) ?
                    <FormControlLabel
                        key={answer.id}
                        control={<Radio sx={{ ml: "5px" }} />}
                        label={answer.text}
                        disabled
                        checked={false}
                    /> :
                    <FormControlLabel
                        sx={{ ml: "px" }}
                        key={answer.id}
                        control={
                            <Radio checked={val}
                                style={{ pointerEvents: "auto" }}
                                onClick={handleChangeVal}
                                sx={{ ml: "10px" }}
                            />
                        }
                        label={answer.text}
                    />
                }
            </CardActionArea>
        </Card>
    );
}
export default SelectableTextRadio;