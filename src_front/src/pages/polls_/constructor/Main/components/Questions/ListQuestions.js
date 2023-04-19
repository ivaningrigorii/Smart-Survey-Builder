import { useEffect, useState, useRef } from "react";
import ConstructorServices from "../../ConstructorServices";
import { Box } from "@mui/material";
import { QuestTestSimpleEv, QuestSimple } from "./Questions";

const cs = new ConstructorServices();

const ListQuestions = ({ questions, setQuestions }) => {



    const type_question = (question) => {
        let resourcetype = question.resourcetype;
        if (resourcetype==="QuestionSimple") 
            return <QuestSimple key={question.id} question={question}/>;
        if (resourcetype==="QuestionTestSimpleEv") 
            return <QuestTestSimpleEv key={question.id} question={question}/>;
    }

    return (
        <Box>
            {questions.map((question)=>{
                return (
                    <Box>
                        {type_question(question)}
                    </Box>
                );
            })}
        </Box>
    )
}
export default ListQuestions;