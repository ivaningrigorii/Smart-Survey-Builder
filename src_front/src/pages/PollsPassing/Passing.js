import { useState, Component } from 'react';
import { useParams } from 'react-router-dom';
import PageStartInformation from './PageStartInformation';
import plus_url_server from '../../plus_url_server';


//получение slug и поиск опроса в бд
const Passing = () => {
    const { slug } = useParams();
    const [surveys, setSurveys] = useState([]);

    fetch(plus_url_server("/api/v1/passing/list_surveys/"))
        .then((response) => response.json())
        .then(data => setSurveys(data["results"]));

    return (
        <div>
            <PageStartInformation surveys={surveys} />
        </div>
    );
}
export default Passing;