import Header from "../../../../components/Header/Header";
import React, { Component } from 'react';
import Footer from "../../../../components/Footer/Footer";
import routes from "../../../../routes";
import AuthServices from "../../../personal/Auth/AuthServices";
import CreateQuestions from "./components/CreateQuestions";
import ConstructorTabs from "./components/ConstructorTabs";
const auths = new AuthServices();

const ConsructorPage = () => {
    document.title = "Конструктор опроса";
    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <div className="consructor-page">
                <Header />
                <ConstructorTabs />
                {/* <CreateQuestions/> */}
                <Footer />
            </div>
        );
    }
}
export default ConsructorPage;

