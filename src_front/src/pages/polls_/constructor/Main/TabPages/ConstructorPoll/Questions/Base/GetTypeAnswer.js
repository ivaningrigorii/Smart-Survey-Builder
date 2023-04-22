import ASelectableSimple from "../../Answers/Base/Selectable/AnswSelectableSimple";
import ASelectableTest from "../../Answers/Base/Selectable/AnswSelectableTest";
import ATextInput from "../../Answers/Base/AnswTextInput";


const GetTypeAnswer = ({answer, deleteAnswer, }) => {
    let resourcetype = answer.resourcetype;
    switch (resourcetype) {
        case "AnswerSelectableSimple":
            return <ASelectableSimple key={answer.id} answer={answer}
             deleteAnswer={deleteAnswer} />;
        case  "AnswerSelectableTest":
            return <ASelectableTest key={answer.id} answer={answer} 
            deleteAnswer={deleteAnswer} />;
        case "AnswerTextInput":
            return <ATextInput key={answer.id} answer={answer} 
            deleteAnswer={deleteAnswer} />;
        default:
            return;
    }
}
export default GetTypeAnswer;