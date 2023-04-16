import axios from 'axios';
import _token from '../../../../AxiosTokens';

class PollsServices {
    getPollsOwn() {
        return axios.get("api/v1/profile/cats_own/", {
            headers: {
                'Authorization': 'Bearer '+_token(),
            },
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export default PollsServices;