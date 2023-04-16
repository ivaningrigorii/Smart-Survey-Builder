import axios from 'axios';
import _token from '../../../AxiosTokens';

class ProfileServices {
    getProfileData() {
        const token_ = _token();
        const bearer_str = 'Bearer ' + token_;

        return axios.get("api/v1/profile/me/", {
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
export default ProfileServices;