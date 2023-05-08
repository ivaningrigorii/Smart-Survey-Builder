import axios from 'axios';
import _token from '../../../AxiosTokens';
import { useParams } from 'react-router';
import { reverse } from 'named-urls';

class PollsServices {
    async getPollsOwn(page, page_size) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.get("api/v1/profile/cats_own/", {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            params: {
                page: page,
                page_size: page_size,
            },
        })
            .then((response) => {
                console.log(response.data);
                return Promise.resolve(response.data);
            })
            .catch(function (error) {
                return Promise.reject(error);
            });
    }

    async deletePoll(id) {
        let token;
        await _token().then(async (res)=>token = await res);

        try {
            if (!id || id <= 0) {
                throw new Error();
            }
            let path = reverse("api/v1/manage/surv/survey-header/:id/", {id: id, });

            return axios.delete(path, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => {
                    return Promise.resolve(response.data);
                })
                .catch(function (error) {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }

}
export default PollsServices;