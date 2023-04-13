import { useState, Component } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _token from '../../AxiosTokens';

//получение slug и поиск опроса в бд
//пока просто тестовый хук "тыкал"
const Passing = () => {
    const {slug} = useParams();
    console.log(slug);
    axios.get("api/v1/profile/me/", {
        headers: {
            'Authorization': `Bearer ${_token()}`
        },
      })
      .then(function (response) {
        console.log(response.data);
        return Promise.resolve();
    })
    .catch(function (error) {
        return Promise.reject();
    });
    
    return (
        <div></div>
    );

    
}
export default Passing;