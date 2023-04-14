import axios from 'axios';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();


class AuthServices {

    constructor() { }

    //save jwt
    saveToken(tokens_from) {
        cookies.remove('tokens');
        cookies.remove('tt');
        cookies.set('tokens', JSON.stringify(tokens_from), {
            secure: true,
            sameSite: "none",
            path: '/',
        });
        cookies.set('tt', Date.now(), {
            secure: true,
            sameSite: "none",
            path: '/',
        });
    }

    // login
    getTokenData(username, password) {
        const self = this;
        return axios.post('api/v1/login/jwt/create/', {
            username: username,
            password: password
        })
            .then(function (response) {
                self.saveToken({
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
    refreshToken(tokens) {
        let work_tokens = JSON.stringify(tokens);
        const ussss = "hello";
        return axios.post('api/v1/login/jwt/refresh/', {
            hello: 'hell',
            name_aboba: 'aboba'
        })
            .then(function (response) {
                let result =  JSON.stringify({
                    accessToken: response.data.access,
                    refreshToken: response.data.refresh
                });
                return result;
            })
            .catch(function (error) {
                return Promise.reject;
            });

    }
}
export default AuthServices;

