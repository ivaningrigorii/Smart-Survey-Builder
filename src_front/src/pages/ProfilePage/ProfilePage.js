import Header from "../../components/Header/Header";
import React, { Component } from 'react';
import Footer from "../../components/Footer/Footer";
import ProfileShow from "./components/ProfileShow";

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
        };
    }

    render() {
        return (
            <div>
                <Header />
                <ProfileShow />
                <Footer />
            </div>
        );

    }
    componentDidMount() {
        document.title = "Профиль";
    }
}
export default ProfilePage;