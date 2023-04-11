import  React, { Component } from  'react';

class  ProfilePage  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            surveys: [],
        };
    }


    render() {
        return (
            
            <div  className="front--test">
                <h3>Страница профиля</h3>
            </div>
            );
            
      }
      componentDidMount() {
        document.title = "Профиль";
      }
    }
    export  default   ProfilePage;