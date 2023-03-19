import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import OurTestList from "./OurTestList";
import './App.css';

import React, { Component } from 'react';
import FrontTest from "./FrontTest";
//пока тут вызывается только тестовый класс
/*ОБЯЗАТЕЛЬНО СДЕЛАТЬ вызов домена сервера в url где-то в отдельной переменной,
  чтоб потом по 100 раз не переделывать*/
class  App  extends  Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OurTestList />} /> 
          <Route path="/front_test" element={<FrontTest/>} /> 
        </Routes>
      </BrowserRouter>
    );

  }
  }
  export  default  App;