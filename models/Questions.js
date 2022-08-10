export default class Questions{
    constructor(id,questionType,content,answers){
        this.id = id;
        this.questionType = questionType;
        this.content =content;
        this.answers = answers;
    }
    showHTML(){
        return `
            <div>
                Coming soon
            </div>
        `
    }
    checkAns(){
        return 0;
    }

}