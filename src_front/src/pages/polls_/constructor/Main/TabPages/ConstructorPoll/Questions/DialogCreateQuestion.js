import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,
        DialogTitle, FormControl, FormControlLabel, InputLabel, 
        MenuItem, Select, Switch, IconButton, } from '@mui/material';
import React, { useCallback } from 'react';
import { ControlPoint,  } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

//дефолтные варинты вопросов при создании
const QSimple = {
    text_question: "",
    survey: 0,
    one_answer_with_a_choice: true,
    option_required_for_pass: true,
    resourcetype: "QuestionSimple",
}
const QTest = {
    text_question: "",
    survey: 0,
    one_answer_with_a_choice: true,
    option_required_for_pass: true,
    resourcetype: "QuestionTest",
}


const CreateQuestion = ({ createQuestion,  }) => {
    const default_variats_ = [QSimple, QTest];

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectAnswer, setSelectAnswer] = React.useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectAnswer = (event) => {
        setSelectAnswer(event.target.value);
    };

    const addValue = useCallback(event => {
        let mydata = default_variats_[selectAnswer-1];
        createQuestion(mydata);
        setOpen(false);
    });

    return (
        <React.Fragment>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <ControlPoint/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Добавление ответа</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Установите тип вопроса
                    </DialogContentText>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="max-width">Тип ответа</InputLabel>
                            <Select
                                autoFocus
                                value={selectAnswer}
                                onChange={handleSelectAnswer}
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value="1">Простой вопрос</MenuItem>
                                <MenuItem value="2">Тестовый вопрос</MenuItem>
                            </Select>
                        </FormControl>
                        <Button size='small' onClick={ addValue }>
                            Добавить
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
export default CreateQuestion;