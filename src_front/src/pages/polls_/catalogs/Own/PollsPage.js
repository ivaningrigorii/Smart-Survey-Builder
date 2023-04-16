import React, { Component } from 'react';
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import SearchPolls from "./components/SearchPolls";
import AuthServices from '../../../personal/Auth/AuthServices';
import routes from '../../../../routes';
const auths = new AuthServices();

const PollsPage = () => {
    document.title = "Каталоги опросов";

    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <div >
                <Header />
                <SearchPolls />
                <Footer />
            </div>
        );
    }
}
export default PollsPage;