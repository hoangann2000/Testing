import Questions from "./Questions.js";

export default class SingleChoice extends Questions {

    constructor(...params) {
        super(...params);
    }
    showHTML() {
        //chứa các thẻ radio của 1 câu hỏi
        let contentSingle = "";

        this.answers.map((radio, index) => { 
                contentSingle +=`
                    <div class="col-6">
                        <div class="custom-control custom-radio">
                            <input type="radio" id="multi${this.id}-mulAnswer${radio.id}" name="multi-${this.id}" class="custom-control-input" value="${radio.content}">
                            <label class="custom-control-label" for="multi${this.id}-mulAnswer${radio.id}">${radio.content}</label>
                        </div>
                    </div>
                `
         });

        return contentSingle;
    }
    checkAns(userAns) {
        let exactID = "";
        this.answers.map((radio) => { 
            if(radio.exact){
                exactID = radio.id
            }
         });


         if(userAns == exactID){
            return true;

         }else{
            return false;
         }
    }
}




