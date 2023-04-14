import AuthServices from "./AuthServices";
const auths = new AuthServices();

const LogoutWithotPage = () => {
    auths.deleteToken();
    return (window.location.replace('/'));
}
export default LogoutWithotPage;