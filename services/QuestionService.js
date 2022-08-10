export default class QuestionService{
    getQuestionList(){
        return axios({
            method: 'get',
            url: 'https://6065c01ab8fbbd001756734b.mockapi.io/Questions',
          });
    } 
}