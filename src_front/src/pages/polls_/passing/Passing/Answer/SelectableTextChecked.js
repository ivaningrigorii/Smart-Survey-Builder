import { FormControlLabel, Radio, Box, FormControl, Checkbox, } from "@mui/material";
import { useEffect, useState } from "react";

const SelectableTextChecked = ({ answer, disable_other,
    setSelectableValueUp, selectable_value_up, }) => {

    const [val, setVal] = useState(false);

    useEffect(() => {
        if (disable_other == true) {
            setVal(false);
            let sa = [];
            setSelectableValueUp(sa);
        }
    }, [disable_other]);

    useEffect(() => {
        if (val == true) {
            let sa = selectable_value_up.slice();
            if (sa.indexOf(answer.id) < 0) {
                sa.push(answer.id);
                setSelectableValueUp(sa);
            }
        } else {
            setSelectableValueUp(selectable_value_up.filter(val => val != answer.id));
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
                    control={<Checkbox />}
                    label={answer.text}
                    disabled
                    checked={false}
                /> :
                <FormControlLabel
                    key={answer.id}
                    control={
                        <Checkbox checked={val}
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
export default SelectableTextChecked;