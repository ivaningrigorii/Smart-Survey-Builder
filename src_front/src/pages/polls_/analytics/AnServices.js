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

    async getNumberPassing(idPoll) {
        let token;
        await _token().then(async (res)=>token = await res);
        let path = reverse("api/v1/analytics/number_passing/:id/", {id: idPoll});
        return axios
        .get(path, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }

    async getTextAnswers(idQuestion) {
        let token;
        await _token().then(async (res)=>token = await res);
        let path = reverse("api/v1/analytics/simple_analytics/:id/", {id: idQuestion});
        return axios
        .get(path, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          return Promise.resolve(response.data.result_text_input_answers);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
}
export default AnServices;