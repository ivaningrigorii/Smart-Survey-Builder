import {
    TextField, Box, Card, CardContent, Stack, IconButton, Switch,
    FormControlLabel, Checkbox,
} from "@mui/material";
import { TypesCSS } from "../../style";
import { DeleteOutline, CheckTwoTone, CheckBox, Edit, Undo, } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import ConstructorServices from '../../../../../ConstructorServices';

const cs = new ConstructorServices();

const ASelectableTest = ({ answer, deleteAnswer, saveAnswer, }) => {
    const classes = TypesCSS();

    const [field_edit, setFieldEdit] = useState(false);
    const [isDisableWithoutChanged, setIsDisableChanged] = useState(true);

    const [text, setText] = useState(answer.text);
    const [correct, setCorrect] = useState(answer.correct);

    const handleDelete = useCallback(event => {
        deleteAnswer(answer.id);
    }, [deleteAnswer,]);


    const handleChangeText = (event) => {
        if (isDisableWithoutChanged == true)
            setIsDisableChanged(false);
        setText(event.target.value);
    }

    const handleChangeCorrect = (event) => {
        if (isDisableWithoutChanged == true)
            setIsDisableChanged(false);
        let correct_ = correct == true ? false : true;
        setCorrect(correct_);
    }

    const handleSave = () => {
        saveAnswer({
            text: text,
            correct: correct,
            id: answer.id,
        })
            .then((res) => {
                setIsDisableChanged(true);
                setFieldEdit(false);
            })

    };

    const handlEnterKeyUp = (e) => {
        e.which = e.which || e.keyCode;
        if (e.which == 13) {
            handleSave();
        }
    }

    const cancelChanging = () => {
        if (isDisableWithoutChanged == false) {
            let res = window.confirm("У вас есть несохранённые данные. Вернуться?");
            if (res == true) {
                setText(answer.text);
                setCorrect(answer.correct);
                setFieldEdit(false);
                setIsDisableChanged(true);
            }
        } else {
            setFieldEdit(false);
        }
    }

    return (
        <Box>
            <Card className={classes.card_style} sx={{borderRadius: "25px",}}>
                {field_edit == true &&
                    <CardContent>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end">
                            <Stack onClick={cancelChanging} >
                                ответ на тестовый вопрос
                            </Stack>

                            <IconButton size="small" color="primary"
                                onClick={handleDelete}>
                                <DeleteOutline fontSize="inherit" />
                            </IconButton>
                            <IconButton size="small" color="primary"
                                disabled={isDisableWithoutChanged} onClick={handleSave}>
                                <CheckTwoTone fontSize="inherit" />
                            </IconButton>
                            <IconButton size="small" color="secondary"
                                onClick={cancelChanging}>
                                <Undo fontSize="inherit" />
                            </IconButton>

                        </Stack>

                        <TextField name="text" fullWidth size="small" label="Ответ на вопрос"
                            defaultValue={text} onChange={handleChangeText}
                            onKeyUp={handlEnterKeyUp} />

                        правильный ли ответ: <Switch defaultChecked color="secondary" size="small"
                            defaultChecked={correct} name="correct" id="correct"
                            onChange={handleChangeCorrect} />
                    </CardContent>
                }
                {field_edit == false &&
                    <Stack direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        onClick={() => setFieldEdit(true)}
                    >
                        {correct == true &&
                            <FormControlLabel control={<Checkbox
                                defaultChecked
                                size="small"
                                color="primary" />}
                                label={text}
                                sx={{ marginLeft: "5px", }}
                            />
                        } {correct == false &&
                            <FormControlLabel control={<Checkbox
                                defaultChecked
                                size="small" color="secondary" />}
                                label={text}
                                sx={{ marginLeft: "5px", }}
                            />
                        }
                        <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            onClick={(event)=>event.stopPropagation()}
                            >
                            <IconButton size="small" color="primary"
                                onClick={handleDelete}>
                                <DeleteOutline fontSize="inherit" />
                            </IconButton>

                            <IconButton size="small" color="primary"
                                onClick={() => setFieldEdit(true)}>
                                <Edit fontSize="inherit" />
                            </IconButton>
                        </Stack>

                    </Stack>
                }
            </Card>
        </Box>
    );
}
export default ASelectableTest;
