import Header from "../../../components/Header/Header";
import React, { Component } from 'react';
import Footer from "../../../components/Footer/Footer";
import ProfileShow from "./components/ProfileShow";
import AuthServices from "../Auth/AuthServices";
import routes from "../../../routes";
const auths = new AuthServices();

const ProfilePage = () => {
    document.title = "Профиль";

    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <div>
                <Header />
                <ProfileShow />
                <Footer />
            </div>
        );
    }
}
export default ProfilePage;