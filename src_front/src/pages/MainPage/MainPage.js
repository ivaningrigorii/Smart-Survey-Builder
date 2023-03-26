import Header from "../../components/Header/Header";
import  React, { Component } from  'react';
import './MainPage.css';
import logoUrl from '../../images/label.svg';
import logoPen from '../../images/pen.jpg';
import logoQuestion from '../../images/question.png';
import logoAnalze from '../../images/analize.png';
import Footer from "../../components/Footer/Footer";
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
                <div class="main-page-inf">Умный конструктор опросов
                <div className="main-page-img">
                <img src={logoUrl} alt="УКМ" />
                </div>            
                </div>
                <div className="main-page-block-inf-image">                          
                    <img src={logoPen} alt="УКМ" />                   
                    </div>
                    <div className="main-page-block-text">
                    Создание
                  </div>                                  
                <div className="main-page-block">            
              <div className="main-page-block-inf">
                Создавай опрос с помощью удобных инструментов
                </div>          
                </div>  

                <div className="main-page-block-inf-image">                          
                    <img src={logoQuestion} alt="УКМ" />                   
                    </div>
                    <div className="main-page-block-question-text">
                    Прохождение
                  </div>                                  
                <div className="main-page-block">            
              <div className="main-page-block-question-inf">
                Делись ссылкой и проходи опрос
                </div>          
                </div>     

                  <div className="main-page-block-inf-image">                          
                    <img src={logoAnalze} alt="УКМ" />                   
                    </div>
                    <div className="main-page-block-analize-text">
                   Анализ
                  </div>                                  
                <div className="main-page-block">            
              <div className="main-page-block-analize-inf">
                Получай результат
                </div>          
                </div>  
                <Footer/>                   
            </div>
            
            );
            
      }
    }
    export  default  MainPage;