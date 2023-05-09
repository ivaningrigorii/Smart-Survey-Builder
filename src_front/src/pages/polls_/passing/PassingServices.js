import axios from 'axios';
import { useParams } from 'react-router';
import { reverse } from 'named-urls';
import _token from '../../../AxiosTokens';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class PassingServices {

    reloadIdToSlug(slug) {
        let path = reverse("api/v1/passing/id-from-slug/:slug/", { slug: slug, });

        return axios.get(path)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }

    async passingStart(id, token) {
        let header = {};

        if (cookies.get('tokens')) 
            await _token().then(async (res) =>
                header["Authorization"] = 'Bearer ' + await res);

        return axios.post('api/v1/passing/taking_survey/start/', {
            survey: id,
        }, {
            headers: header,
        },)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }

    async listQuestions(id, page) {
        let header = {};

        if (cookies.get('tokens')) 
            await _token().then(async (res) =>
                header["Authorization"] = 'Bearer ' + await res);
        
        return axios.get(reverse("api/v1/passing/list_questions/:id/", { id: id }), {
            headers: header,
            params: {
                page: page,
            },
        },)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }

    async saveAnswer(id, result_questions) {
        let header = {};

        if (cookies.get('tokens')) 
            await _token().then(async (res) =>
                header["Authorization"] = 'Bearer ' + await res);
        
        return axios.post(reverse("api/v1/list_questions/:id/", { id: id }), {
            result_questions: result_questions,
        }, { headers: header, },)
            .then((resp) => Promise.resolve(resp))
            .catch((err) => Promise.reject(err))
    }

    async passingEnd(id) {
        let header = {};

        if (cookies.get('tokens')) 
            await _token().then(async (res) =>
                header["Authorization"] = 'Bearer ' + await res);

        let path = reverse("/passing/taking_survey/end/:id/", { id: id });

        return axios.patch(path, { id: id }, { headers: header, },)
            .then((respone) => Promise.resolve(respone.data))
            .catch((error) => Promise.reject(error))
    }

}
export default PassingServices;