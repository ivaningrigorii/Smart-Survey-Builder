import Header from "../../components/Header/Header";
import  React, { Component } from  'react';
import Footer from "../../components/Footer/Footer";
import MainPageInf from "./components/MainPageInf/MainPageInf";
class  MainPage  extends  Component {

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
                <MainPageInf/>
                <Footer/>                   
            </div>        
            );          
      }
    }
    export  default  MainPage;