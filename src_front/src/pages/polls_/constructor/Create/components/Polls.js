import { useEffect, useState, useCallback } from 'react';
import TimePassing from './custom_mui/TimePassing';
import StartTime from './custom_mui//StartTime';
import EndTime from './custom_mui/EndTime';
import { Grid, Container } from '@mui/material';

const SSimple = ({ data, setData }) => {
    const [data_] = useState({ resourcetype: "SurveySimple" });

    useEffect(() => {
        setData(data_);
    }, [data_]);

    return (<div></div>);
}

const STest = ({ data, setData }) => {
    const [start_time, setStartTime_] = useState();
    const [endTime, setEndTime_] = useState();
    const [timePassing, setTimePassing_] = useState();
    const [data__, setData_] = useState({ resourcetype: "SurveyTest" });

    useEffect(() => {
        let data_ = data__;
        data_.start_time = start_time;
        data_._end_time = endTime;
        data_.time_passing = timePassing;
        setData_(data_);
        handleInputChange();
    }, [start_time, endTime, timePassing]);

    const handleInputChange = useCallback(event => {
        setData(data__);
    });

    return (
        <Container sx={{ display: 'flex' }}>
                <StartTime start_time={start_time} setStartTime={setStartTime_} />
                <EndTime endTime={endTime} setEndTime={setEndTime_} />
                <TimePassing timePassing={timePassing} setTimePassing={setTimePassing_} />
        </Container>
    );
}

export { STest, SSimple };