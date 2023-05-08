import { useState, Component } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _token from '../../../../AxiosTokens';
import PassingServices from "../PassingServices";
import {id} from "date-fns/locale";

const pas = new PassingServices();
//получение slug и поиск опроса в бд
//пока просто тестовый хук "тыкал"
const Passing = () => {
    const {slug} = useParams();
    console.log(slug);


    return (

        <div>

        </div>
    );
}
export default Passing;