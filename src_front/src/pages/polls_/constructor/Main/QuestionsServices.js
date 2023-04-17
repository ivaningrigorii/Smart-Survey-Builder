import axios from 'axios';
import _token from '../../../../AxiosTokens';

class QuestionsServices {
    getQuestionsData() {
        const token_ = _token();
        const bearer_str = 'Bearer ' + token_;

        return axios.get("api/v1/manage/quest/question/21/", {
            headers: {
                'Authorization': bearer_str,
            },
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export default QuestionsServices;