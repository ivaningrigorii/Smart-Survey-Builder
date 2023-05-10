import { FormControlLabel, Radio, Box, FormControl, } from "@mui/material";
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
    }, [val]);

    const handleChangeVal = () => {
        val == true ? setVal(false) : setVal(true);
    }

    return (
        <Box>
            {(disable_other == true) ?
                <FormControlLabel
                    key={answer.id}
                    control={<Radio />}
                    label={answer.text}
                    disabled
                    checked={false}
                /> :
                <FormControlLabel
                    key={answer.id}
                    control={
                        <Radio checked={val}
                            style={{ pointerEvents: "auto" }}
                            onClick={handleChangeVal}
                        />

                    }
                    label={answer.text}
                />
            }
        </Box>
    );
}
export default SelectableTextRadio;