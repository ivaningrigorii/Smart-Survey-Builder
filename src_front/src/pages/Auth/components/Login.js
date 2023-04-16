import React, { useState } from 'react';
import "./AuthorizPage.css";
import AuthServices from '../AuthServices';
import routes from '../../../routes';
const aths = new AuthServices();

const Login = () => {
  const [inputUsername, setUsername] = useState('');
  const [inputPassword, setPassword] = useState('');

  function handleLogin(event) {
    let login_data = {
      username: inputUsername,
      password: inputPassword
    }
    if (!login_data.username || !login_data.password) {
      alert("Не все поля заполнены!");
    } else {
      aths.getTokenData(login_data.username, login_data.password).then((result)=>{
        if (result.name=="resolve") {
          window.location.replace(routes.profile);
        } else {
          alert('Ошибка входа! \nПроверьте логин и пароль!');
        }
      });
    }
    event.preventDefault();
  };

  return (
    <div className="main-page">
      <div className="main-page-inf">
        <h1>Вход</h1>
        <form onSubmit={handleLogin}>
          <input type='text' name='username' id='username'
            onChange={(event) => setUsername(event.target.value)} /><br />
          <input type='password' name='password' id='password'
            onChange={(event) => setPassword(event.target.value)} /><br />
          <button type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );

}
export default Login;