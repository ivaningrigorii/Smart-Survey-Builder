import React, { Component } from 'react';
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import SearchPolls from "./components/SearchPolls";
import "./PollsPage.css"
const PollsPage = () => {
    document.title = "Каталоги опросов";
    return (
        <div className="polls-page">
            <Header />
            <SearchPolls />
            <Footer />
        </div>
    );
}
export default PollsPage;