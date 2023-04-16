import Header from "../../components/Header/Header";
import React, { Component, useEffect } from 'react';
import Footer from "../../components/Footer/Footer";
import CreateSelecter from "./components/CreateSelecter";
import AuthServices from "../Auth/AuthServices";
import routes from "../../routes";
const auths = new AuthServices();

const CreatePage = () => {
    document.title = "Создание опроса";
    useEffect(()=>{
        if (!auths.findAuthTokens()) {
            window.location.replace(routes.auth.login);
        }
    });
    return (
        <div className="create-page">
            <Header />
            <CreateSelecter />
            <Footer />
        </div>
    );
}
export default CreatePage;


