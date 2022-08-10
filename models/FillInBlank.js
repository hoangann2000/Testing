import Questions from "./Questions.js";

export default class FillInBlank extends Questions {

    constructor(...params) {
        super(...params);
    }
    showHTML() {
        return `
            <div class="col-12">
                <textarea class="form-control" id="fill${this.id}-fillAnswer${this.answers[0].id}" rows="3"></textarea>
            </div>
        `
    }
    checkAns(userAns) {
        if (userAns == this.answers[0].content) {
            return true;
        } else {
            return false;
        }
    }
}


