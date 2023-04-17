import _token from '../../../../AxiosTokens';
import axios from 'axios';

export default class ServicesCreateQuestion {
    createQuestion(data) {
        return axios.post('api/v1/manage/quest/question/', data, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        },)
            .then((response) => {
                return Promise.resolve({id: response.data.id});
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}
///не исп