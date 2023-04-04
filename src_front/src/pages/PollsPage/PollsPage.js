import  React, { Component } from  'react';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SearchPolls from "./components/SearchPolls";
import "./PollsPage.css"
class  PollsPage  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            surveys: [],
        };
    }


    render() {
        return (
                                                               // для зарегистрированного пользователя поменять
            <div  className="polls-page">
                <Header/>                                         
                <SearchPolls/>      
                <Footer/> 
            </div>
            );
            
      }
    }
    export  default  PollsPage;