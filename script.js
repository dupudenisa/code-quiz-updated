// my variables 
var counter = 60;
var currentQuestionIndex = 0
var questionLength = 0;

var myTime;

var timer = document.getElementById("timertime");

var QuestionContainer = document.getElementById('question-container');

var startButton = document.getElementById('start-btn');

var questionElement = document.getElementById("question");

var doneContainer = document.getElementById('done-container');

var initialsId = document.getElementById("initials");

var highscoreContainer = document.getElementById('highscore-container');

var finalScore = document.getElementById('final-score');

var correctIncorrect = document.getElementById("correctIncorrect");
var answerButtonsElement = document.getElementById("answer-btn");


var clear = document.getElementById("clear-btn");
var highscoreBtn = document.getElementById("hs-btn");

var highList = document.getElementById("highscores");




//questions used in quiz
var questions = [
    {
        title: "What is meant by console.log?",
        choices: ["displays discreetly to the debugger", "displays a pop-up message to the user", "creates a new variable","a type of variables that are collections"],
        answer: "displays discreetly to the debugger" 
        
        //A//
    },
    {
        title: "What is an element in an Array marked by?",
        choices: ["length ", "Index", "jQuery","console.log"],
        answer: "Index" 
        
        //B//
    },
    {
        title: "What are the three building blocks of the web?",
        choices: ["JQuery, HTML, chrome", "HTML,Javascript,windows", "HTML, CSS, Javascript","Javascript,CSS,LMM"],
        answer: "HTML, CSS, Javascript" 
        
        //C//
    },
    {
        title: "What does Math.random do?",
        choices: ["deletes all of the math on the page", "Returns a random number between 0 & 1", "returns the last index of an array","returns a random number between 0 & 10"],
        answer: "Returns a random number between 0 & 1" 
        
        //B//
    },
    {
        title: "How do you make a new directory through your terminal?",
        choices: ["console.log", "rm", "git clone","mkdir"],
        answer: "mkdir" 
        
        //D//
    },
] 

// clicking the start button at the beginning of the quiz
startButton.addEventListener('click', startGame)

//Function that allows the start button to work, as well as my timer//
function startGame() {
    
    myTime = setInterval(timeIt, 1000)
    timer.textContent = counter;

//setting time interval and hiding start button when quiz starts 

    startButton.setAttribute("class", "hide");;
    QuestionContainer.removeAttribute("class", "hide");;
    setNextQuestion();
}


function timeIt() {

    counter--;
    timer.textContent = counter;
  
    // check if user ran out of time
    if (counter <= 0) {
      endQuiz();
    }
  

}

//My function for starting the next question//
function setNextQuestion() {

    questionLength = questions.length;
    
    if(currentQuestionIndex == questionLength)
    {
        finishedQuiz();
    }

    answerButtonsElement.innerHTML = "";
    var currentQuestions = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestions.title;
    
 // setting attributes to chocie bttn 

    currentQuestions.choices.forEach(function (choice, i)
    {
        var choiceBtn = document.createElement("button");      
        choiceBtn.setAttribute("class","btn");
        choiceBtn.setAttribute("class","btn-dark");
        choiceBtn.setAttribute("value", choice)
        choiceBtn.textContent = choice;
        answerButtonsElement.appendChild(choiceBtn);  
        choiceBtn.onclick = clickAnswer
    })
    
function clickAnswer() {
 // increasing the index. 
    var someAnswer = questions[currentQuestionIndex].answer
    
// if else statement for my correct/incorrect answers. If answer is incorrect, timer subtracts by 10  
    if (this.textContent === someAnswer){

        correctIncorrect.textContent = "Correct!";

        currentQuestionIndex++;

        setNextQuestion();
    }
    
    else {

        correctIncorrect.textContent = "Incorrect!";

        currentQuestionIndex++;
        counter = counter - 10;
        setNextQuestion();
    }

}

}
// end of unfinished quiz
 function endQuiz() {
     clearInterval(counter);
     QuestionContainer.setAttribute("class","hide")
     alert("You did not complete the Quiz in time. Please try again!")
     location.reload();
}

// end of finished quiz
function finishedQuiz(){
    alert("Congradulations!! You reached the end!")
    QuestionContainer.setAttribute("class","hide");
    doneContainer.removeAttribute("class","hide");
    clearInterval(counter);

    showFinalScore();
    
}

function showFinalScore(){

    var finalScore = document.getElementById("final-score");
    var submit = document.getElementById("submit-btn");

    var score = counter;
    finalScore.textContent = "Your final score is:" + score;
    clearInterval(counter);

    finalScore.removeAttribute("class","hide");
    submit.addEventListener('click', highscore);
    

}

// saving highscore
function highscore() {

    var initials = initialsId.value.trim();
   
    finalScore.setAttribute("class", "hide");
    doneContainer.setAttribute("class","hide");
    highscoreContainer.removeAttribute("class", "hide");

    
    if (initials == "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        

        var Score = {
            scoreF: counter,
            initials: initials
        };

        highscores.push(Score);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        
        var li = document.createElement("li");
        li.textContent = Score.initials + " - " + Score.scoreF;
    
        // display on page
        highList.appendChild(li);

    }

}
