import Header from "../../components/Header/Header";
import  React, { Component } from  'react';
import Footer from "../../components/Footer/Footer";
import CreatePoll from "./components/CreatePoll";
class  CreatePage  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            surveys: [],
        };
    }

    render() {
        return (           
            <div  className="main-page">
                <Header/>
                <CreatePoll/>
                <Footer/>                   
            </div>        
            );          
      }
    }
    export  default  CreatePage;