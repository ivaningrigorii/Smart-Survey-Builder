import { FormControlLabel, Checkbox, Card, CardActionArea, CardContent, Stack, } from "@mui/material";
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
    }, [val,]);

    const handleChangeVal = () => {
        if (disable_other != true) {
            val == true ? setVal(false) : setVal(true);
        }
    }

    return (
        <Card sx={{ marginTop: '2vh', minWidth: "50vw", }}>
            <CardActionArea onClick={handleChangeVal}>
                <Stack direction="row">
                    {(disable_other == true) ?
                        <FormControlLabel
                            key={answer.id}
                            control={<Checkbox size="small"/>}
                            label={answer.text}
                            disabled
                            checked={false}
                            sx={{ ml: "5px", }}
                        /> :
                        <FormControlLabel
                            key={answer.id}
                            control={
                                <Checkbox checked={val}
                                    style={{ pointerEvents: "auto" }}
                                    sx={{ ml: "10px", }}
                                />
                            }
                            label={answer.text}
                        />
                    }
                </Stack>
            </CardActionArea>
        </Card>
    );
}
export default SelectableTextChecked;