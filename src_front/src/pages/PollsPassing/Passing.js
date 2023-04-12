import { useState, Component } from 'react';
import { useParams } from 'react-router-dom';
import PageStartInformation from './PageStartInformation';
import plus_url_server_api_v1 from '../../plus_url_server';


//получение slug и поиск опроса в бд
const Passing = () => {
    //const { slug } = useParams();
    //const [surveys, setSurveys] = useState([]);
    //const [details, setDetails] = useState("");

    fetch(plus_url_server_api_v1("/profile/cats_own/"))
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res;
            } else {
                let error = new Error(res.statusText);
                error.response = res;
                throw error
            }
        })
        .then(res => res.json())
        .then(data => console.log('+', data))
        .catch((e) => {
            if (e.response.status == 401) {
                window.location.replace("/auth/");
            }
        });
    /*
        .then((response) => response.json())
        .then(data => {
            console.log(data["details"]);
            if (true) {
                setSurveys(data["results"]);
            } else {
                setDetails(data["details"]);
            }
        });
        */
    //<PageStartInformation surveys={surveys} />
    return (
        <div>

        </div>
    );
}
export default Passing;