import ASelectableSimple from "../../Answers/Base/Selectable/AnswSelectableSimple";
import ASelectableTest from "../../Answers/Base/Selectable/AnswSelectableTest";
import ATextInput from "../../Answers/Base/AnswTextInput";


const GetTypeAnswer = ({ answer, deleteAnswer, saveAnswer, }) => {
    let resourcetype = answer.resourcetype;
    switch (resourcetype) {
        case "AnswerSelectableSimple":
            return <ASelectableSimple key={answer.id} answer={answer}
                deleteAnswer={deleteAnswer} saveAnswer={saveAnswer} />;
        case "AnswerSelectableTest":
            return <ASelectableTest key={answer.id} answer={answer}
                deleteAnswer={deleteAnswer} saveAnswer={saveAnswer} />;
        case "AnswerTextInput":
            return <ATextInput key={answer.id} answer={answer}
                deleteAnswer={deleteAnswer} saveAnswer={saveAnswer} />;
        default:
            return;
    }
}
export default GetTypeAnswer;