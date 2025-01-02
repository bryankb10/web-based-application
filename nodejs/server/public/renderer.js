let questions = [];
let currentPrize = 0;
let level = 1;
let currentQuestionIndex = 0;

const currentQuestion = {
  level: 0,
  question: "",
  options: ["", "", "", ""],
  correct: 0,
  prize: 0
};

let togglereward = true;

// Open navigation panel
function openNav() {
  document.body.style.overflow = "hidden";
  document.getElementById("reward-container").style.transform = "translateX(0)";
  document.getElementById("reward-container").style.visibility = "visible";
  document.getElementById("iconpanel").style.transform = "translateX(0)";
  document.getElementById("arrow").classList.replace("arrow-left", "arrow-right");
  document.getElementById("arrow-wrapper").classList.replace("arrow-wrapper-left", "arrow-wrapper-right");
}

// Close navigation panel
function closeNav() {
  document.body.style.overflow = "hidden";
  document.getElementById("reward-container").style.transform = "translateX(100%)";
  document.getElementById("reward-container").style.visibility = "hidden";
  document.getElementById("iconpanel").style.transform = "translateX(325px)";
  document.getElementById("arrow").classList.replace("arrow-right", "arrow-left");
  document.getElementById("arrow-wrapper").classList.replace("arrow-wrapper-right", "arrow-wrapper-left");
}

// Toggle reward panel
document.getElementById('iconpanel').onclick = () => {
  togglereward ? closeNav() : openNav();
  togglereward = !togglereward; 
};

// Fetch questions from API
async function fetchQuestions() {
  try {
    const response = await fetch('http://localhost:3000/api/questions');
    questions = await response.json();
    showQuestion();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

// Register player highscore
async function playerHighscore(nm) {
  try {
      const response = await fetch('http://localhost:3000/api/questions/register/'+ nm +'/' + currentPrize);
  }
  catch (error) {
      console.error('Error fetching users:', error);
  }
}

// Navigate to high scores
function navigateToHighScores() {
  const playerName = document.getElementById("playerName").value;
  playerHighscore(playerName);
    window.location.href = "/highscores";
}

// Shuffle questions for the current level
function shuffleQuestionsInLevel() {
  const currentLevelQuestions = questions.filter(q => q.level === level);
  shuffleArray(currentLevelQuestions);
  return currentLevelQuestions[0];
}

// Fisher-Yates shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Show question in the UI
function showQuestion() {
  let beat = new Audio('../images/opening.mp3');
  beat.play();
  document.getElementById("divanimasi").style.display = "none";
  document.getElementById("question-content").style.display = "block";
  document.getElementById("question-panel").style.backgroundColor = "#000";
  document.getElementById(`divpanel${level}`).style.backgroundColor = "yellow";
  document.getElementById("question-panel").style.border = "2px solid black";

  const temp = shuffleQuestionsInLevel();
  
  if (!temp) {
    alert("Congratulations! You've won the game!");
    resetGame();
    return;
  }

  currentQuestion.level = temp.level;
  currentQuestion.question = temp.question;
  currentQuestion.options = temp.options;
  currentQuestion.correct = temp.correct;
  currentQuestion.prize = temp.prize;

  document.getElementById('question').textContent = currentQuestion.question;
  document.getElementById('current-prize').textContent = currentPrize;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    optionElement.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(optionElement);
  });
}

// Handle correct answer
function correctCondition() {
  document.getElementById("winmessage").innerHTML = `You got $${currentPrize}`;
  document.getElementById("divanimasi").style.display = "block";
  document.getElementById("question-content").style.display = "none";  
  document.getElementById("question-panel").style.backgroundColor = "transparent";
  document.getElementById("question-panel").style.border = "none";
  document.body.style.pointerEvents = "none"; // Disable pointer events globally

  setTimeout(() => {
    document.body.style.pointerEvents = "auto";
    document.getElementById("divanimasi").style.pointerEvents = "auto";
    showQuestion(); 
  }, 5000);
}

// Check the selected answer
function checkAnswer(selectedIndex) {
  if (selectedIndex === currentQuestion.correct) {
    currentPrize = currentQuestion.prize;
    if (level >= 15) {
      alert('Congratulations! You\'ve won the game!');
      if (window.api) {
        const playerName = document.getElementById("playerName").value; // Retrieve player name
        playerHighscore(playerName);
        navigateToHighScores();
      }
      else {window.location.href = "/";}
    } else {
      document.getElementById(`divpanel${level}`).style.backgroundColor = "#0000cc";
      level++;
      correctCondition();
      alert('Correct!');
    }
  } else {
    document.getElementById(`divpanel${level}`).style.backgroundColor = "#0000cc";
    displayGameOverScreen();
  }
}

// Reset the game
function resetGame() {
  level = 1;
  currentPrize = 0;
  showQuestion();

  // Reset lifelines
  document.getElementById('fifty-fifty').style.backgroundColor = "#000099"; 
  document.getElementById('phone-friend').style.backgroundColor = "#000099"; 
  document.getElementById('ask-audience').style.backgroundColor = "#000099"; 
  document.getElementById('fifty-fifty').disabled = false;
  document.getElementById('phone-friend').disabled = false;
  document.getElementById('ask-audience').disabled = false;
}

// Display game over screen
function displayGameOverScreen() {
  document.getElementById(`divpanel${level}`).style.backgroundColor = "#0000cc";
  document.body.classList.add('grayscale');
  document.body.style.pointerEvents = "none";

  // Show the "Game Over" screen and messages
  document.getElementById("wrong").style.display = "block";
  document.getElementById("losemessage").style.display = "flex";

  let lose = new Audio('../images/lose.mp3');
  lose.play();

  alert('Game Over!');
  if (window.api) {
    const playerName = document.getElementById("playerName").value; // Retrieve player name
    playerHighscore(playerName);
    setTimeout(navigateToHighScores, 3000);
  }
  closeNav();
  setTimeout(() => {
    window.location.href = "/";
  }, 4000);
}


// Lifeline implementations
document.getElementById('fifty-fifty').onclick = () => {
  const options = document.querySelectorAll('.option');
  let removed = 0;
  const correctIndex = currentQuestion.correct;

  options.forEach((option, index) => {
    if (index !== correctIndex && removed < 2) {
      option.style.visibility = 'hidden';
      removed++;
    }
  });
  document.getElementById('fifty-fifty').classList.add('used');
  document.getElementById('fifty-fifty').disabled = true;
};

document.getElementById('phone-friend').onclick = () => {
  const isCorrect = Math.random() < 0.75; // 75% chance to be correct
  const guessedAnswer = isCorrect ? currentQuestion.correct : (currentQuestion.correct + 1) % 4;
  alert(`Your friend thinks the answer is ${String.fromCharCode(65 + guessedAnswer)}`);
  document.getElementById('phone-friend').classList.add('used');
  document.getElementById('phone-friend').disabled = true;
};

document.getElementById('ask-audience').onclick = () => {
  const audienceResponse = generateAudienceResponse(currentQuestion.correct);
  alert(`Audience Response:\nA: ${audienceResponse[0]}%\nB: ${audienceResponse[1]}%\nC: ${audienceResponse[2]}%\nD: ${audienceResponse[3]}%`);
  document.getElementById('ask-audience').classList.add('used');
  document.getElementById('ask-audience').disabled = true;
};

// Generate audience response
function generateAudienceResponse(correctIndex) {
  const response = [0, 0, 0, 0];
  for (let i = 0; i < 100; i++) {
    const num = Math.floor(Math.random() * 100);
    if (num <= 30) response[correctIndex]++;
    else {
      const num2 = Math.floor(Math.random() * 4);
      if (num2 !== correctIndex) response[num2]++;
      else i--;
    }
  }
  return response;
}

// Initialize the game
fetchQuestions();