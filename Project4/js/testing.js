const questionNumber=document.querySelector(".question_number");
const questionText=document.querySelector(".question_text");
const optionContainer=document.querySelector(".option_container");
const answersIndicatorContainer=document.querySelector(".answers_indicator");
const homeBox=document.querySelector(".home_box");
const quizBox=document.querySelector(".quiz_box");
const resultBox=document.querySelector(".result_box");


let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
let correctAnswer=0;
let attempt=0;




function setAvailableQuestions(){
    const totalQuestion=quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i]);
    }
}
function getNewQuestion(){
    questionNumber.innerHTML="Вопрос "+(questionCounter+1)+" из "+quiz.length;

    const questionIndex=availableQuestions[Math.floor(Math.random()*availableQuestions.length)];
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;

    const index1=availableQuestions.indexOf(questionIndex);
    availableQuestions.slice(index1,1);

    const optionLen=currentQuestion.options.length;
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML='';
    let animationDelay=0.1;

    for(let i=0; i<optionLen;i++){
        const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
        const index2=availableOptions.indexOf(i);
        availableOptions.slice(index2,1);
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[i];
        option.id=i;
        option.style.animationDelay=animationDelay+'s';
        animationDelay=animationDelay+0.15;
        option.className="option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)")
    }
    questionCounter++


}
function getResult(element){
    const id=parseInt(element.id);
    if(id===currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswer++;
    }else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
        const optionLen=optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionLen=optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answerIndicator(){
    answersIndicatorContainer.innerHTML='';
    const totalQuestion=quiz.length;
    for(let i=0;i<totalQuestion;i++){
        const indicator=document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
        
    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}
function next(){
    if(questionCounter===quiz.length){
        quizOver();

    }else{
        getNewQuestion();
    }
}
function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
    
 

}


function quizResult(){
  resultBox.querySelector(".total_question").innerHTML=quiz.length;
  resultBox.querySelector(".total_attempt").innerHTML=attempt;
  resultBox.querySelector(".total_correct").innerHTML=correctAnswer;
  resultBox.querySelector(".total_wrong").innerHTML=attempt-correctAnswer;
  const persentage=(correctAnswer/quiz.length)*100;
  resultBox.querySelector(".percentage").innerHTML=persentage.toFixed(2)+"%";
  resultBox.querySelector(".total_score").innerHTML=correctAnswer+"/"+quiz.length;


  var lastinp={
  "question":quiz.length,
  "attempt":attempt,
  "correct":correctAnswer,
  "wrong":attempt-correctAnswer,
  "persentage":(correctAnswer/quiz.length)*100,
  "score":correctAnswer+"/"+quiz.length,
  }
  localStorage.setItem ('lastinp', JSON.stringify(lastinp));
}
function resetQuiz(){
    questionCounter=0;
    correctAnswer=0;
    attempt=0;
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();


}

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();

    answerIndicator();
}
function backToHome(){
    location.href="main.html"
}

window.onload=function(){
    homeBox.querySelector(".total_question").innerHTML=quiz.length;

}

