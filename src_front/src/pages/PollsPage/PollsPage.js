import  React, { Component } from  'react';

class  PollsPage  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            surveys: [],
        };
    }


    render() {
        return (
            
            <div  className="front--test">
                <h3>Страница со всеми опросами</h3>
            </div>
            );
            
      }
    }
    export  default  PollsPage;