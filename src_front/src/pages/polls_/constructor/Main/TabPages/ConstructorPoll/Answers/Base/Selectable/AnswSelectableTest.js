import { TextField, Box, Card, CardContent, Stack, IconButton, Switch } from "@mui/material";
import { TypesCSS } from "../../style";
import { DeleteOutline, CheckTwoTone } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import ConstructorServices from '../../../../../ConstructorServices';

const cs = new ConstructorServices();

const ASelectableTest = ({ answer, deleteAnswer, }) => {
    const classes = TypesCSS();
    const [disSave, setDisSave] = useState(true);
    const [del_, setDel_] = useState(false);

    const handleReadyToSave = () => {
        setDisSave(false);
    }

    const handleDelete = useCallback(event => {
        deleteAnswer(answer.id);
    }, [deleteAnswer,]);

    /*

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
    */
    return (
        <Box>
            <Card className={classes.card_style}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        ответ на тестовый вопрос <IconButton size="small" color="primary" 
                        onClick={handleDelete}>
                            <DeleteOutline fontSize="inherit" />
                        </IconButton>
                        <IconButton size="small" color="primary" disabled={disSave} >
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
export default ASelectableTest;
