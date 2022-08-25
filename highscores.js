var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map(function (score) {
  return "<li class=\"high-score\">".concat(score.name, " - ").concat(score.score, "</li>");
}).join("");

// i dynamically created a list class within javascript so that the data from the highscores would internally be listed within the html below the highscores title 