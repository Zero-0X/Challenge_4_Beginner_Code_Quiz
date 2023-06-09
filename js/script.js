const startButton = document.getElementById('start-quiz');
const continueButton = document.getElementById('next-question');
const catchPhrase = document.getElementById('catch-phrase');
const leaderboard = document.getElementById('leaderboard');
const quizContainer = document.getElementById('quiz-container');
const questions = document.getElementById('question');
const choices = document.getElementById('choices');
const timerTitle = document.getElementById('timer-title');

const countdownElement = document.getElementById('countdown');
var quizTimer = document.getElementById('quiz-timer');
var timer;
var penalty = 6;
var time = 60;
let currentQuestionIndex = 0;
let score = 0
let leaderboardData = [];

startButton.addEventListener('click', startQuiz);

// function that displays the start button and hides the quiz container until the player clicks start
function startQuiz() {
  console.log('GO!')
  catchPhrase.classList.add('hide')
  startButton.classList.add('hide')
  leaderboard.classList.add('hide')
  quizContainer.classList.remove('hide')
  quizTimer.style.display = ('hide');
  startTimer()
  showQuestion(0);
}
// function that sets the questions from the questions.js file, in order, starting with question 1, ending with question 10

function startTimer() {
  time = 60;

  timer = setInterval(function () {
    time--;
    countdownElement.textContent = time.toString();

    if (time <= 0) {
      clearInterval(timer);
      console.log("Game Over!");
      endQuiz();
    }
  }, 1000);
}

function showQuestion(index) {
  const question = questionData[index];
  questions.textContent = `Question ${index + 1}: ${question.question}`;

  choices.innerHTML = '';

  for (let j = 0; j < question.choices.length; j++) {
    const choice = document.createElement('button');
    choice.textContent = question.choices[j];
    choice.addEventListener('click', function () {
      checkAnswer(choice, question.correctAnswer);
    });
    choices.appendChild(choice);
  }
}

function questionSequence(data) {
  for (let i = 0; i < data.length; i++) {
    const question = data[i].question;
    const answerChoices = data[i].choices;

    questions.textContent = `Question ${i + 1}: ${question}`;

    choices.innerHTML = '';

    for (let j = 0; j < answerChoices.length; j++) {
      const choice = document.createElement('button');
      choice.textContent = answerChoices[j];
      choice.addEventListener('click', function () {
        checkAnswer(choice, data[i].correctAnswer);
      });
      choices.appendChild(choice);
    }
  }
}

// function to check the selected answer
function checkAnswer(selectedChoice, correctAnswer) {
  if (selectedChoice.textContent === correctAnswer) {
    selectedChoice.classList.add('correct');
    score++;
  } else {
    selectedChoice.classList.add('incorrect');
    penalize();
  }

  disableChoices();
  showNextButton();

  if (currentQuestionIndex === questionData.length < 1) {

    endQuiz();
  }
}

// function to penalize for incorrect answers
function penalize() {
  // time = time - penalty;
  // countdownElement.textContent = time;
  time -= penalty;
  countdownElement.textContent = time.toString();

}

// function to disable the answer choices
function disableChoices() {
  const answerButtons = document.querySelectorAll('#choices button');
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
}

// function to show the next question button
function showNextButton() {
  continueButton.classList.remove('hide');
  disableChoices();
}

// function to handle the next question button click
continueButton.addEventListener('click', function () {
  continueButton.classList.add('hide');
  currentQuestionIndex++;

  if (currentQuestionIndex < questionData.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
});

leaderboard.addEventListener('click', displayLeaderboard);

// function to end the quiz and display the leaderboard
function endQuiz() {
  clearInterval(timer);
  countdownElement.textContent = 'Game Over!';
  choices.innerHTML = '';
  quizContainer.classList.add('hide');
  leaderboard.classList.remove('hide');
  timerTitle.classList.add('hide');

  const gameOverParagraph = document.getElementById('game-over');
  gameOverParagraph.textContent = 'Game Over!';
  gameOverParagraph.style.fontSize = '100px';
  gameOverParagraph.style.color = '#ffd23f';
  gameOverParagraph.style.textShadow = '4px 4px #ee4266';
  gameOverParagraph.style.marginTop = '100px';
  gameOverParagraph.style.marginBottom = 'auto';
  gameOverParagraph.style.textAlign = 'center';

  // TODO: Implement logic to display the leaderboard with scores
  const playerInitials = prompt('Enter your initials:');
  leaderboardData.push({ initials: playerInitials, score });

  console.log('Quiz ended');
}

// TODO: Implement logic to display the leaderboard with scores

function displayLeaderboard() {
  console.log('How did you do?')
  
  // Sort leaderboard data by score in descending order
  leaderboardData.sort((a, b) => b.score - a.score); 

  // Clear the leaderboard container
  leaderboard.innerHTML = ''; 

  const leaderboardTitle = document.createElement('h2');
  leaderboardTitle.textContent = 'Leaderboard';
  leaderboard.appendChild(leaderboardTitle);

  const leaderboardTable = document.createElement('table');

  // Create table header
  const headerRow = document.createElement('tr');
  const initialsHeader = document.createElement('th');
  initialsHeader.textContent = 'Initials';
  const scoreHeader = document.createElement('th');
  scoreHeader.textContent = 'Score';
  headerRow.appendChild(initialsHeader);
  headerRow.appendChild(scoreHeader);
  leaderboardTable.appendChild(headerRow);

  // Add leaderboard data to the table
  leaderboardData.forEach((entry) => {
    const row = document.createElement('tr');
    const initialsCell = document.createElement('td');
    initialsCell.textContent = entry.initials;
    const scoreCell = document.createElement('td');
    scoreCell.textContent = entry.score;
    row.appendChild(initialsCell);
    row.appendChild(scoreCell);
    leaderboardTable.appendChild(row);
  });

  leaderboard.appendChild(leaderboardTable);
}


questionSequence(questionData);