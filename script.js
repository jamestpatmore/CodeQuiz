//const startButton = document.getElementById('start-btn') was originally going to create some functionality for when you press the start button that the page would remove classes and begin a function
// but i thought it wouldv'e been less time consuming just <a> referencing a seperate page for those set functionalities 
var timerEl = document.getElementById('timer');
var sec = 90;
var time = setInterval(myTimer, 1000); // the timer const/variables just created 90 seconds so 15 seconds for each question. which i feel like is an ample amount of time for the user 
// one thing i will note  is i got alot of inspiration from James Quick's video regarding Javascrtipt quiz but he wrote his in es6 and were not there yet so i
// took what i learned from that and used vanilla java for my project (what i know for now)

var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var progressBar = document.getElementById('progressBar');
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');
/*
startButton.addEventListener('click', startGame)
highsoreButton.addEventListener('click', viewHighscore)
*/

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = []; 
// this value below is cool because i can use the dataset numbers to then portray these choices 

var questions = [{
  question: "What year was Javascript invented?",
  choice1: '1995',
  choice2: '1996',
  choice3: '1994',
  choice4: '1999',
  answer: 1
}, {
  question: "What is the most commonly used coding language besides Javascript?",
  choice1: 'PYTHON',
  choice2: 'RUBY',
  choice3: 'HTML/CSS',
  choice4: 'SQL',
  answer: 3
}, {
  question: "What does the .md in README.md stand for",
  choice1: 'MINIMILIZED-DOCUMENTATION',
  choice2: 'MINIMIZED-DOCUMENTATION',
  choice3: 'MARKDOWN',
  choice4: 'MARK DAVIS',
  answer: 3
}, {
  question: "What are a few basic data types you can include in JSON structure?",
  choice1: 'STRINGS',
  choice2: 'ARRAYS',
  choice3: 'NUMBERS',
  choice4: 'ALL OF THE ABOVE',
  answer: 4
}, {
  question: "What is considered the tech capitol of the world?",
  choice1: 'SILICON VALLEY, CALIFORNIA',
  choice2: 'TOKYO, JAPAN',
  choice3: 'LONDON, ENGLAND',
  choice4: 'BEND, OREGON',
  answer: 1
}, {
  //one thing i proabably could've integrated but wouldv'e had to create a seperate algorithom for was to include this question but make it the last one to appear
  question: "Bonus(4fun): What year did Steve Jobs unviel his new & iconic iphone model at the MacWorld Expo?",
  choice1: '2005',
  choice2: '2007',
  choice3: '2006',
  choice4: '2009',
  answer: 2
}];
var scorePoints = 100;
var maxQuestions = 6;

startGame = function startGame() {
  myTimer();
  questionCounter = 0;
  score = 0;
  availableQuestions = [].concat(questions);
  console.log(availableQuestions);
  getNewQuestion();
};

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("end.html");
  }

  questionCounter++;
  questionCounterText.innerText = questionCounter + '/' + maxQuestions;
  progressBarFull.style.width = "".concat(questionCounter / maxQuestions * 100, "%");

  // progress bar is able to properly fill by the question that the user is on 

  var questionIndex = Math.floor(Math.random() * availableQuestions.length); // the randomization of questions to create some unpredictiability 

  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach(function (choice) {
    var number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

;
choices.forEach(function (choice) {
  choice.addEventListener("click", function (e) {
    if (!acceptingAnswers) return; // e target event functions to take the data from what the user chose so i can initiate the correct answer and some functions to apply the classes i made so they can have immediate feedback as to 
    // if they got the answer right or not (by color) but also by score points 

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];
    var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incremetScore(scorePoints);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(function () {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

function incremetScore(num) {
  score += num;
  scoreText.innerText = score;
}

startGame();

function myTimer() {
  document.getElementById('timer').innerHTML = sec;
  sec--;

  if (sec == -1) {
    clearInterval(time);
    alert("Time out!!! :(");
    return window.location.assign("end.html"); // if the timer is up the user will get an alert as well as getting directed to the endpage which would then after all of this evaluate the score that they have recieved 
  }
}

;





