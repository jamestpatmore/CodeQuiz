var username = document.getElementById('username');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var MAX_HIGH_SCORES = 5;
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', function () {
  saveScoreBtn.disabled = !username.value;
});
// the save button is disabled until there is a vlue in the username box making it so that the user has to input there name to then get access to save 

saveHighScore = function saveHighScore(e) {
  e.preventDefault();
  var score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  highScores.splice(5);
  // this will filter out the top 5 highest scores in local storage or else this list will go on for awhile if many users play the game 
  localStorage.setItem('highScores', JSON.stringify(highScores));
  
  window.location.assign('highscore.html');
  
};





