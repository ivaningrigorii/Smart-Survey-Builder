import  React, { Component } from  'react';
import axios from 'axios';

class  FrontTest  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            surveys: [],
        };
    }


    render() {
        return (
            <div  className="front--test">
                <h3>Я крокодил я крокожу </h3>
            </div>
            );
      }
    }
    export  default  FrontTest;