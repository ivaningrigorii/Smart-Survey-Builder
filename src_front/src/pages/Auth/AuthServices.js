import axios from 'axios';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

class AuthServices {

    //save jwt
    saveToken(tokens_from) {
        cookies.set('tokens', JSON.stringify(tokens_from));
    }

    // login
    getTokenData(username, password) {
        return axios.post('api/v1/login/jwt/create/', {
            username: username,
            password: password
        })
            .then(function (response) {
                cookies.set('tokens', {
                    access: response.data.access,
                    refresh: response.data.refresh
                });
                return Promise.resolve;
            })
            .catch(function (error) {
                return Promise.reject;
            });
    }

    // refresh jwt
    refreshToken(refresh) {
        return axios.post('api/v1/login/jwt/refresh/', {
            refresh,
        })
            .then(function (response) {
                return {
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token
                };
            }
                .catch(function (error) {
                    return Promise.reject();
                })
            );
    }
}
export default AuthServices;