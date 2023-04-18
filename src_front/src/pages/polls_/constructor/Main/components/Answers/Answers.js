import { useEffect, useState, useCallback } from 'react';
import { Grid, Container } from '@mui/material';
import Correct from "./custom_mui/Correct";
import Text from "./custom_mui/TextAnswer";

const ASSimple = ({ data, setData }) => {
    const [text, setText_] = useState();
    const [data__, setData_] = useState({ resourcetype: "AnswerSelectableSimple" });

    useEffect(() => {
        let data_ = data__;
        data_.text = text;
        setData_(data_);
        handleInputChange();
    }, [text]);

    const handleInputChange = useCallback(event => {
        setData(data__);
    });

    return (
        <Container sx={{ display: 'flex' }}>
                <Text text={text} setText={setText_} />
        </Container>
    );
}


const ASTest = ({ data, setData }) => {
    const [text, setText_] = useState();
    const [correct, setCorrect_] = useState();
    const [data__, setData_] = useState({ resourcetype: "AnswerSelectableTest" });

    useEffect(() => {
        let data_ = data__;
        data_.correct = correct;
        data_.text = text;
        setData_(data_);
        handleInputChange();
    }, [correct, text]);

    const handleInputChange = useCallback(event => {
        setData(data__);
    });

    return (
        <Container sx={{ display: 'flex' }}>
                <Text text={text} setText={setText_} />
                <Correct correct={correct} setCorrect={setCorrect_} />
        </Container>
    );
}

const ATInput = ({ data, setData }) => {
    const [data_] = useState({ resourcetype: "AnswerTextInput" });

    useEffect(() => {
        setData(data_);
    }, [data_]);

    return (<div></div>);
}
export {ASSimple, ASTest, ATInput };