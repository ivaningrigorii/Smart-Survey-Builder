import axios from 'axios';
import { useParams } from 'react-router';
import { reverse } from 'named-urls';
import _token from '../../../AxiosTokens';

class PassingServices {

    reloadIdToSlug(slug) {
        try {
            let path = reverse("api/v1/passing/id-from-slug/:slug/", {slug: slug, });

            return axios.get(path)
                .then((response) => {
                    return Promise.resolve(response.data);
                })
                .catch(function (error) {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    start(id, token) {
        return axios.post('api/v1/passing/taking_survey/start/', {
            survey: id,
        }, {
            headers: { 'Authorization': 'Bearer ' + _token(), }
        },)
            .then((response) => {
                return Promise.resolve(response.data);
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }

     PassingOprosa(id) {
       try {
            if (!id || id <= 0) {
                throw new Error();
            }
           return axios.get(reverse("\n" +
               "api/v1/list_questions/:id/", {id:id}), {
               headers: {
                    'Authorization': 'Bearer ' + _token(),
                }
            })
                .then((response) => {
                    return Promise.resolve(response.data);
                })
                .catch(function (error) {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    //Сохранение или изменение сведений об ответах
    SaveAnswer(id, result_questions) {
        return axios.post(reverse("\n" +
            "api/v1/list_questions/:id/", {id: id}), {
            result_questions: result_questions,
            headers: {
                'Authorization': 'Bearer ' + _token(),
            }
        })
            .then((resp) => {
                return Promise.resolve(resp);
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    }
    PassingEnd(id) {
       let path = reverse("/passing/taking_survey/end/:id/", {id: id});
       return axios.patch(path, id, {
           headers: { 'Authorization': 'Bearer ' + _token(), }
       })
      .then((respone)=>{ return Promise.resolve(respone.data);})
      .catch((error)=>{ return Promise.reject(error);})
    }

}
export default PassingServices;