import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { useCallback } from 'react';
import React from 'react';
import { IconButton } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

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

//дефолтные варинты отетов при создании
const default_variants = {
    "AnswerTextInput": {
        resourcetype: "AnswerTextInput",
    },

    "AnswerSelectableSimple": {
        text: "ответ по-умолчанию",
        resourcetype: "AnswerSelectableSimple",
    },

    "AnswerSelectableTest": {
        text: "ответ по-умолчанию, неправильный",
        correct: false,
        resourcetype: "AnswerSelectableTest",
    }
};

const rus_description = {
    en: ["AnswerTextInput", "AnswerSelectableSimple", "AnswerSelectableTest"],
    rus: ["Ввод текста", "Обычный ответ", "Правильный/неправльный ответ"],
}


const CreateAnswer = ({ createAnswer, allow_fields }) => {
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
        console.log(selectAnswer);
        if (allow_fields.indexOf(rus_description.en[Number(selectAnswer - 1)]) >= 0) {
            let mydata = default_variants[rus_description.en[Number(selectAnswer - 1)]];
            createAnswer(mydata);
            setOpen(false);
        }
    });

    return (
        <React.Fragment>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <ControlPoint />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Добавление ответа</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Установите тип ответа
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
                                {allow_fields &&
                                    allow_fields.map(allow_answer => {
                                        let i = rus_description.en.indexOf(allow_answer);
                                        return <MenuItem value={i + 1}>
                                            {rus_description.rus[i]}
                                        </MenuItem>;
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button size='small' onClick={addValue}>
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
export default CreateAnswer;