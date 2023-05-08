import _token from '../../../../AxiosTokens';
import axios from 'axios';

export default class ServicesCreatePage {
    async createPoll(data) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.post('api/v1/manage/surv/survey-header/', data, {
            headers: { 'Authorization': 'Bearer ' + token, }
        },)
            .then((response) => {
                return Promise.resolve({id: response.data.id});
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}