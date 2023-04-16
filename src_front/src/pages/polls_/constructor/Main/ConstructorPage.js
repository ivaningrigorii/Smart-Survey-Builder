import Header from "../../../../components/Header/Header";
import React, { Component } from 'react';
import Footer from "../../../../components/Footer/Footer";
import routes from "../../../../routes";
import AuthServices from "../../../personal/Auth/AuthServices";

const auths = new AuthServices();

const ConsructorPage = () => {
    document.title = "Конструктор опроса";
    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <div className="consructor-page">
                <p>Конструктор создания опроса</p>
            </div>
        );
    }
}
export default ConsructorPage;