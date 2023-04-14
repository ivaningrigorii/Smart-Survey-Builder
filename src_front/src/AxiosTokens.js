import { Cookies } from 'react-cookie';
import AuthServices from './pages/Auth/AuthServices';

const aths = new AuthServices();
const cookies = new Cookies();
const time_life_access_token = 1000 * 60 * 29;
const time_life_refresh_token = 1000 * 60 * 60 * 24 * 3 - 60;


function getPayload(jwt) {
    return atob(jwt.split(".")[1])
}

//получение access токена или перенаправление на авторизацию
export default function _token() {
    const login_url = '/auth/login/';
    let tokens = cookies.get('tokens');
    let time_update_tokens = cookies.get('tt');

    if (!tokens) {
        return window.location.replace(login_url);
    }
    
    if (Date.now() - time_update_tokens > time_life_access_token) {
        if (Date.now() - time_update_tokens > time_life_refresh_token){
            return window.location.replace(login_url);
        }
        try {
            tokens = aths.refreshToken(tokens);
            aths.saveToken(tokens);
        } catch {
            return window.location.replace(login_url);
        }
    }

    return tokens.access;
}