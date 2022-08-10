import FillInBlank from "../models/FillInBlank.js";
import SingleChoice from "../models/SingleChoice.js";
import QuestionService from "../services/QuestionService.js";

const questionSer = new QuestionService();
//chứa các đối tượng câu hỏi đã phân loại 
let questionList = [];

let getList = () => {
    //questionSer.getQuestionList().then().catch()
    let promise = questionSer.getQuestionList();

    promise.then((result) => {
        console.log(result.data);
        //Phân loại câu hỏi để hiển thị phù hợp
        result.data.map((item, index) => {
            let { id, questionType, content, answers } = item;
            switch (questionType) {
                case 1:
                    let single = new SingleChoice(id, questionType, content, answers);
                    questionList.push(single);
                    break;
                case 2:
                    let fill = new FillInBlank(id, questionType, content, answers);
                    questionList.push(fill);
                    break;
                default:
                    break;
            }
        });

        // console.log(questionList);
        showQuestion();


    }).catch((error) => {
        console.log(error);
    })
}

getList();


let showQuestion = () => {
    // Chứa các thẻ html của các câu hỏi
    let contentHTML = "";
    questionList.map((question, index) => {
        // content += question.showHTML();
        let { id, content, answers } = question;

        let buttonHTML = "";
        if (index != (questionList.length - 1)) {
            //Nếu không phải câu cuối 
            //tạo button next
            buttonHTML = `
                <a href="#quiz-${questionList[index + 1].id}" class="quiz__btn quiz__next">NEXT</a>
                `
        } else {
            //Tạo button submit
            buttonHTML = `
                <a href="#quizResult" class="quiz__btn quiz__next" onclick="showResult()" >SUBMIT</a>
            `
        }

        contentHTML += `
                <div class="quizSection" id="quiz-${id}">
                    <div class="quiz__main">
                        <div class="quiz__header">
                            <p>${content}</p>
                        </div>
                        <div class="quiz__body row">
                            ${question.showHTML()}
                        </div>
                        <div class="quiz__footer">
                            <p class="quiz__current">Question ${index + 1} of ${questionList.length}</p>
                            ${buttonHTML}
                        </div>
                    </div>
                </div>       
            `
    });

    document.querySelector("#quizList").innerHTML = contentHTML;
}



/**
 * Tính điểm
 * 2 vế của phép so sánh
 * 1: giá trị từ người dùng
 * 2: đáp án đúng từ BE
 */

let showResult = () => {
    let numTrue = 0;
    questionList.map((question, index) => {
        let { id, questionType,answers } = question;
        let userAns = "";
        switch (questionType) {
            case 1:
                //loại có 4 radio
                answers.map((radio) => { 
                    let radioTag = document.getElementById(`multi${id}-mulAnswer${radio.id}`);
                    if(radioTag.checked == true ){
                        userAns = radio.id;
                    }
                });
                console.log(userAns);

                if(question.checkAns(userAns)){
                    // numTrue +=1;
                    numTrue++;
                }

                break;
            case 2:

                userAns = document.getElementById(`fill${id}-fillAnswer${answers[0].id}`).value;
                console.log(userAns);

                if(question.checkAns(userAns)){
                    // numTrue +=1;
                    numTrue++;
                }


                break;
            default:
                break;
        }


        // console.log()
    });


    console.log(numTrue);

}

window.showResult = showResult;



