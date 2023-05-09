import _token from '../../../AxiosTokens';
import axios from 'axios';
import { reverse } from 'named-urls';

// все axios запросы модуля аналитики

class AnServices {

    constructor(){}

    async postPollAnalize(data) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.post('api/v1/analytics/simple_analytics/', data, {
            headers: { 'Authorization': 'Bearer ' + token, }
        },)
            .then((response) => {
                return Promise.resolve(response.data.answers);
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}
export default AnServices;