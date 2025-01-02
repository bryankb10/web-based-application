const express = require('express');
const router = express.Router();
const questions = require('../models/questions.json');
const users = require('../models/users.json');
const fs = require('fs');

router.get('/', (req, res) => {
  res.json(questions);
});

router.get('/register/:playerName/:score', (req, res) => {
  var players = users;
  var flag = -1;
  for (var i=0;i<players.length;i++) {
    if (players[i].name == req.params.playerName) flag = i;
  }
  if (flag == -1) {
    players.push ({
      "name": req.params.playerName,
      "score": req.params.score
    });
  }
  else {
    if (req.params.score > players[flag].score) {
      players[flag].score = req.params.score;
    }
  }
  let string_js = JSON.stringify(players);
  fs.writeFileSync('./models/users.json',string_js,"UTF-8",{'flags':'w'});
  res.json(players);
});

module.exports = router;