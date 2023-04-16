import Header from "../../../../components/Header/Header";
import React, { Component, useEffect, useState } from 'react';
import Footer from "../../../../components/Footer/Footer";
import CreateSelecter from "./components/CreateSelecter";
import AuthServices from "../../../personal/Auth/AuthServices";
import routes from "../../../../routes";
const auths = new AuthServices();

const CreatePage = () => {
    document.title = "Создание опроса";
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (!auths.findAuthTokens()) {
            window.location.replace(routes.auth.login);
            setLoad(true);
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


