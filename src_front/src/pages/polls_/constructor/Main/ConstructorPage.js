import Header from "../../../../components/Header/Header";
import  React, { Component } from  'react';
import Footer from "../../../../components/Footer/Footer";
class  ConsructorPage  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            surveys: [],
        };
    }

    render() {
        return (           
            <div  className="consructor-page">
                <Header/>
                {/* <ConstructorPoll/> */}
                                
            </div>        
            );      
                
      }
      componentDidMount() {
        document.title = "Конструктор опроса";
      }
    }
    export  default  ConsructorPage;