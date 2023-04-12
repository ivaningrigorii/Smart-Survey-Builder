import { Component } from 'react';


const PageStartInformation = ({surveys}) => {
    return (
        <div>
            <p>Добавил 2 компонент</p>
            {surveys.map(survey => 
            <div>
                {survey.id}<br/>
                {survey.name}<br/>
            </div>)
            }
        </div>
    );
}
export default PageStartInformation;
