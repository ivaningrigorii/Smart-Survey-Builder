import { TextField, Box, Card, CardContent, Stack, IconButton, Switch } from "@mui/material";
import { DeleteOutline, CheckTwoTone } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { TypesCSS } from "../../style";
import ConstructorServices from '../../../../../ConstructorServices';

const cs = new ConstructorServices();


const ASelectableSimple = ({ answer, deleteAnswer }) => {
    const classes = TypesCSS();
    const [disSave, setDisSave] = useState(true);


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
            });
            setDisSave(true);
        }, [changeAnswer,]);
    
        */
    return (
        <Box>
            <Card className={classes.card_style}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        нетестовый ответ <IconButton size="small" color="primary"
                            onClick={handleDelete}>
                            <DeleteOutline fontSize="inherit" />
                        </IconButton>
                        <IconButton size="small" color="primary" disabled={disSave}>
                            <CheckTwoTone fontSize="inherit" />
                        </IconButton>
                    </Stack>
                    <TextField fullWidth size="small" label="Ответ на вопрос"
                        defaultValue={answer.text} onChange={handleReadyToSave} />

                </CardContent>
            </Card>
        </Box>
    );
}
export default ASelectableSimple;