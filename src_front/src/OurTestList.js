import  React, { Component } from  'react';
import axios from 'axios';

class  OurTestList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            surveys: [],
        };
    }
//вот так жёстко url не хранить!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    componentDidMount=() => {
        axios.get('http://localhost:8000/api/v1/passing/list_surveys/')
            .then(res => {
                const surveys = res.data;
                this.setState({ surveys: surveys });
      });
    }
    
    //лучше такие штуки вообще вынести в отдельный файл, DRY
    types_map = {
        "SurveySimple": "Простой опрос",
        "SurveyTest": "Тестирование"
    }

    find_type_survey=(str_type) => {
        return this.types_map[str_type]
    }
       

    render() {
        return (
            <div  className="surveys--list">
                <h3>Это тестовый запуск. <br/>Из БД с сервера выводятся данные о всех опросах.</h3>
                <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>ID</th>
                    <th>Название тестового опроса</th>
                    <th>Когда создан</th>
                    <th>Тип опроса</th>
                </tr>
                </thead>
                <tbody>
                {this.state.surveys.map( s  =>
                    <tr  key={s.pk}>
                    <td>{s.pk}  </td>
                    <td>{s.name}</td>
                    <td>{s.time_create}</td>
                    <td>{this.find_type_survey(s.type_survey)}</td>
                </tr>)}
                </tbody>
                </table>
            </div>
            );
      }
    }
    export  default  OurTestList;