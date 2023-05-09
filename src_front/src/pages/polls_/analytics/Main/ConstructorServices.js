import _token from '../../../../AxiosTokens';
import axios from 'axios';
import { reverse } from 'named-urls';

//тут пока что будут все axios запросы этого модуля

class ConstructorServices {

    constructor(){}

    // postPollAnalize(data) {
    //     return axios.post('api/v1/analytics/simple_analytics/', data, {
    //         headers: { 'Authorization': 'Bearer ' + _token(), }
    //     },)
    //         .then((response) => {
    //             return Promise.resolve({id: response.data.id});
    //         } )
    //         .catch((error) => {
    //             return Promise.reject(error);
    //         });
    // }






    //опрос
    async getPollOptions(id) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.get(reverse("api/v1/manage/surv/survey-header/:id/", {id: id, }), {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((response)=>{
            return(response.data);
        })
        .catch((error)=>{
            console.log("ошибочка");
            return Promise.reject(error);
        })
    }

    async updateIsPublished(id, option_is_published) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.patch(reverse("api/v1/manage/surv/survey-header/:id/", {id:id}), {
            option_is_published: option_is_published,
        }, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((response) => {
            return(Promise.resolve);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
    }

    //вопросы

    async getAllQuestions(idPoll) {
        let token;
        await _token().then(async (res)=>token = await res);

        let path = reverse("api/v1/manage/quest/questions-survey/:id/", {id: idPoll});
        return axios.get(path, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    async createQuestion(data) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.post('api/v1/manage/quest/question/', data, {
            headers: { 'Authorization': 'Bearer ' + token, }
        },)
            .then((response) => {
                return Promise.resolve(response.data);
            } )
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    async deleteQuestion(id) {
        let token;
        await _token().then(async (res)=>token = await res);

        let path = reverse("api/v1/manage/quest/question/:id/", {id: id});
        return axios.delete(path, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    async saveQuestion(dataquestion) {
        let token;
        await _token().then(async (res)=>token = await res);

        let path = reverse("api/v1/manage/quest/question/:id/", {id: dataquestion.id});
        return axios.patch(path, dataquestion, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    //ответы
    async getAllAnswers (id) {
        let token;
        await _token().then(async (res)=>token = await res);

        let path = reverse("api/v1/manage/ans/answers-question/:id/", {id: id});
        return axios.get(path, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    async delAnswer(id) {
        let token;
        await _token().then(async (res)=>token = await res);

        let path = reverse("api/v1/manage/ans/answer/:id/", {id: id});
        return axios.delete(path, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    async changeAnswer(data) {
        let token;
        await _token().then(async (res)=>token = await res);

        let path = reverse("api/v1/manage/ans/answer/:id/", {id: data.id});
        return axios.patch(path, data, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }

    async addAnswer(data) {
        let token;
        await _token().then(async (res)=>token = await res);

        return axios.post("api/v1/manage/ans/answer/", data, {
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        .then((respone)=>{ return Promise.resolve(respone.data);})
        .catch((error)=>{ return Promise.reject(error);})
    }



}
export default ConstructorServices;