import { Cookies } from 'react-cookie';
import AuthServices from './pages/Auth/AuthServices';

const aths = new AuthServices();
const cookies = new Cookies();

//получение access токена или перенаправление на авторизацию
export default function _token() {
    const login_url = '/auth';
    let tokens = null;

    if (cookies.get('tokens')) {
        tokens = cookies.get('tokens');
    } else {
        return window.location.replace(login_url);
    }

    if (Date.now() >= tokens.expires_on * 1000) {
        try {
            tokens = aths.refreshToken(tokens.refresh);
            aths.saveToken(tokens);
        } catch {
            return window.location.replace(login_url);
        }
    }

    return String(tokens.access);
}