import axios from 'axios';
import _token from '../../../../AxiosTokens';
import { useParams } from 'react-router';

class PollsServices {
    getPollsOwn(page, page_size) {
        return axios.get("api/v1/profile/cats_own/", {
            headers: {
                'Authorization': 'Bearer '+_token(),
            },
            data: {
                page: page,
                page_size: page_size,
            },
        })
            .then(function (response) {
                console.log(response.data.next)
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export default PollsServices;