import { TextField, Box, Card, CardContent, Stack, IconButton, Switch } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { DeleteOutline, CheckTwoTone } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import ConstructorServices from "../../ConstructorServices";

const cs = new ConstructorServices();

const ATextInput = ({ answer, deleteOneAnswer, changeAnswer }) => {
    const classes = TypesCSS();

    const handleDelete = useCallback(event => {
        deleteOneAnswer(answer.id);
    }, [deleteOneAnswer,]);

    return (
        <Box>
            <Card className={classes.card_style}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        нетестовый ответ <IconButton size="small" color="primary">
                            <DeleteOutline fontSize="inherit" onClick={handleDelete} />
                        </IconButton>
                    </Stack>
                    <p>ТЕКСТОВОЕ ПОЛЕ: <TextField fullWidth disabled variant="standard" /></p>
                </CardContent>
            </Card>
        </Box>
    );
}
const ASelectableTest = ({ answer, deleteOneAnswer, changeAnswer }) => {
    const classes = TypesCSS();
    const [disSave, setDisSave] = useState(true);
    const [del_, setDel_] = useState(false);

    const handleReadyToSave = () => {
        setDisSave(false);
    }

    const saveNewData = useCallback(event => {
        changeAnswer({
            id: answer.id,
            text: event.target.text,
            correct: event.target.correct
        });
        setDisSave(true);
    }, [changeAnswer,]);

    const handleDelete = useCallback(event => {
        deleteOneAnswer(answer.id);
    }, [deleteOneAnswer,]);

    return (
        <Box>
            <Card className={classes.card_style}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        ответ на тестовый вопрос <IconButton size="small" color="primary"
                            onClick={handleDelete}>
                            <DeleteOutline fontSize="inherit" />
                        </IconButton>
                        <IconButton size="small" color="primary" disabled={disSave} 
                        onClick={saveNewData}>
                            <CheckTwoTone fontSize="inherit" />
                        </IconButton>
                    </Stack>
                    <TextField name="text" fullWidth size="small" label="Ответ на вопрос"
                        defaultValue={answer.text} onChange={handleReadyToSave} />

                    правильный ли ответ: <Switch defaultChecked color="secondary" size="small"
                        defaultChecked={answer.correct} onChange={handleReadyToSave} name="correct"
                        id="correct" />

                </CardContent>
            </Card>
        </Box>
    );
}

const ASelectableSimple = ({ answer, deleteOneAnswer, changeAnswer }) => {
    const classes = TypesCSS();
    const [disSave, setDisSave] = useState(true);


    const handleReadyToSave = () => {
        setDisSave(false);
    }

    const handleDelete = useCallback(event => {
        deleteOneAnswer(answer.id);
    }, [deleteOneAnswer,]);

    const saveNewData = useCallback(event => {
        changeAnswer({
            id: answer.id,
            text: event.target.text,
        });
        setDisSave(true);
    }, [changeAnswer,]);

    return (
        <Box>
            <Card className={classes.card_style}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        нетестовый ответ <IconButton size="small" color="primary">
                            <DeleteOutline fontSize="inherit" onClick={handleDelete} />
                        </IconButton>
                        <IconButton size="small" color="primary" disabled={disSave}>
                            <CheckTwoTone fontSize="inherit" onClick={saveNewData}/>
                        </IconButton>
                    </Stack>
                    <TextField fullWidth size="small" label="Ответ на вопрос"
                        defaultValue={answer.text} onChange={handleReadyToSave} />

                </CardContent>
            </Card>
        </Box>
    );
}

const TypesCSS = makeStyles({
    card_style: {
        marginTop: '2vh',
        marginRight: 'auto',
    },
    header_question: {
        textAlign: 'center',
    },
});

export { ATextInput, ASelectableSimple, ASelectableTest }