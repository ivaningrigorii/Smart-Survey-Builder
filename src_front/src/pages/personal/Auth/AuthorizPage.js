import React, { Component } from 'react';
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Login from "./components/Login"

class PollsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            // для зарегистрированного пользователя поменять
            <div className="polls-page">
                <Header />
                <Login />
                <Footer />
            </div>
        );
    }
}
export default PollsPage;