import { useEffect, useState} from 'react';


const SQSimple = ({ data, setData }) => {
    const [data_] = useState({ resourcetype: "QuestionSimple" });

    useEffect(() => {
        setData(data_);
    }, [data_]);

    return (<div></div>);
}


const SQTest = ({ data, setData }) => {
    const [data_] = useState({ resourcetype: "QuestionTestSimpleEv" });

    useEffect(() => {
        setData(data_);
    }, [data_]);

    return (<div></div>);
}


export { SQTest, SQSimple};
