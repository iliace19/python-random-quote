
const questionNumber=document.querySelector(".question-num");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const answerIndicatorContainer=document.querySelector(".answer-indict");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".quiz-box");
const resultatBox=document.querySelector(".result-box");

let questionCounter=0;
let currentQuestion;
let availabeQuestions=[];
let availabelOptions=[];
let correctAnswer=0;
let attempt=0;

function setAvailabletQuestions(){
    const totalQuestion=quiz.length;
    for (let i=0; i<totalQuestion;i++){
        availabeQuestions.push(quiz[i])
        
    }

}
function getNewQuestions(){
    questionNumber.innerHTML="quiz "  + (questionCounter+1) + " sur " + quiz.length;

    const questionIndex=availabeQuestions[Math.floor(Math.random() * availabeQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML= currentQuestion?.q;
    
    const index1=availabeQuestions.indexOf(questionIndex);
    availabeQuestions.splice(index1,1);
    
   
    const optionLen=currentQuestion.options.length;
    for (let i=0; i<optionLen; i++){
        availabelOptions.push(i)
        
    }
    
    let animationDelay = 0.1;
    optionContainer.innerHTML=""
    for (let i=0; i<optionLen; i++){
        //radom option
        const optionIdex=availabelOptions[Math.floor(Math.random() * availabelOptions.length)];
        //get the position of index from the availableOption
        const index2=availabelOptions.indexOf(optionIdex);
        //remove the 'optionIndex' from the availableOption so that the option doesnt repeat
        availabelOptions.splice(index2,1);
        
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[optionIdex];
        option.id=optionIdex; 
        option.style.animationDelay =animationDelay + "s";
        animationDelay =animationDelay + 0.1;
        option.className="option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
     
    questionCounter++

}
function getResult(element){
    const id=parseInt(element.id);
    
    if (id===currentQuestion.answer){
       // console.log("answer is correct");
        element.classList.add("correct");

        updateAnswerIndicator("correct");
        correctAnswer++
        console.log("correct"+correctAnswer);
    }
    else{

        //console.log("answer is not correct")
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        const optionLen=optionContainer.children.length;
        for (let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    
    }
    attempt++
    unclickableOption();
}
function unclickableOption(){
   const  optionLen=optionContainer.children.length;
   for (let i=0; i<optionLen; i++){
    optionContainer.children[i].classList.add("deja-repondu");
   }
}

function answerIndicator(){
    answerIndicatorContainer.innerHTML='';
    const totalQuestion=quiz.length;
    for (let i=0; i<totalQuestion; i++){
        const indicator=document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }

}
function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType)

}

function next(){
    if (questionCounter===quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
     getNewQuestions();
    }
}

function quizOver(){
    //hide quizBox
    quizBox.classList.add("hide");
    //show resultat box
    resultatBox.classList.remove("hide")
    quizResult();
}

function quizResult(){
    //get quiz resultat
    resultatBox.querySelector(".total-question").innerHTML =quiz.length;
    resultatBox.querySelector(".total-attempt").innerHTML =attempt;
    resultatBox.querySelector(".total-correct").innerHTML =correctAnswer;
    resultatBox.querySelector(".total-wrong").innerHTML =attempt - correctAnswer;
    const percentage =(correctAnswer/quiz.length)*100;
    resultatBox.querySelector(".percentage").innerHTML =percentage.toFixed(2) +"%";
    resultatBox.querySelector(".total-score").innerHTML =correctAnswer +" / "+quiz.length;

}
function resetquiz(){
    questionCounter=0;
    correctAnswer=0;
    attempt=0;
}

function tryAgainQuiz(){
    //hide the resultat
    resultatBox.classList.add("hide");
    //show the quizbox
    quizBox.classList.remove("hide");
    resetquiz();
    startQuiz();

}

function goToHome(){
    //hide the resultat
    resultatBox.classList.add("hide");
    // show home box
    homeBox.classList.remove("hide");
    //reset quiz and go home
    resetquiz()

}
    
//starting point
function startQuiz(){
    //hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    setAvailabletQuestions();
    getNewQuestions();
    answerIndicator();
    quizResult()
    

}
window.onload=function(){
     homeBox.querySelector(".total-question").innerHTML= quiz.length;
}
