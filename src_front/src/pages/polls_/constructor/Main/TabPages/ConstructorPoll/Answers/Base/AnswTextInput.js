import { TextField, Box, Card, CardContent, Stack, IconButton, Switch } from "@mui/material";
import { TypesCSS } from "../style";
import { DeleteOutline, } from "@mui/icons-material";
import { useCallback } from "react";
import ConstructorServices from '../../../../ConstructorServices';

const cs = new ConstructorServices();

const ATextInput = ({ answer, deleteAnswer, }) => {
    const classes = TypesCSS();

    const handleDelete = useCallback(event => {
        deleteAnswer(answer.id);
    }, [deleteAnswer,]);

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
export default ATextInput;