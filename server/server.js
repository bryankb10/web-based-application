const express = require('express');
const path = require('path');
const cors = require('cors');
const questionsRouter = require('./routes/questions');
const users = require('./models/users.json');

const app = express();

app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Web routes
app.get('/', (req, res) => {
  res.render('start');
});

app.get('/input', (req, res) => {
  res.render('input');
});

app.get('/highscores', (req, res) => {
  // Clone the users array to avoid mutating the original
  let players = [...users];
  
  // Ensure all scores are numeric before sorting
  players.sort((a, b) => {
    const scoreA = Number(a.score) || 0; // Convert to number or default to 0
    const scoreB = Number(b.score) || 0;
    return scoreB - scoreA; // Descending order
  });

  // Limit to the top 5 players
  players = players.slice(0, 5);

  // Assign ranks to players
  players.forEach((player, index) => {
    player.rank = index + 1;
  });

  // Render the high score page
  res.render('score', {
    players: players
  });
});

app.get('/scores', (req, res) => {
  let players = [...users];
  
  // Ensure all scores are numeric before sorting
  players.sort((a, b) => {
      const scoreA = Number(a.score) || 0; // Convert to number or default to 0
      const scoreB = Number(b.score) || 0;
      return scoreB - scoreA; // Descending order
  });

  players = players.slice(0, 5);

  players.forEach((player, index) => {
      player.rank = index + 1;
  });

  const simplifiedPlayers = players.map(player => ({
      name: player.name,
      score: player.score,
      rank: player.rank
  }));

  res.json(simplifiedPlayers);
});


app.get('/game/:playerName', (req, res) => {
  var pname = req.params.playerName;
  res.render('game', {
    playerName: pname
  });
});

// API routes
app.use('/api/questions', questionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
