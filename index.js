const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(bodyparser.json());
app.use(morgan("dev"));

let sessions = [];
let games = [{ gameId: 89 }];

app.post("/createsession", (req, res, next) => {
  const { name, gameId, sessionId } = req.body;

  sessions.push({ name, gameId: parseInt(gameId), sessionId });

  res.status(201).end();
});

app.post("/getsessions", (req, res, next) => {
  console.table(sessions);
  const { gameId } = req.body;

  const sessionsToReturn = sessions.filter(
    (s) => s.gameId === parseInt(gameId)
  );
  res.json(sessionsToReturn);
});

app.post("/deletesession", (req, res, next) => {
  let { sessionId, gameId } = req.body;
  gameId = parseInt(gameId);
  sessions = sessions.filter(
    (s) => !(s.sessionId === sessionId && s.gameId === gameId)
  );
  res.status(204).end();
});

app.post("/setgame", (req, res, next) => {
  const {
    gameId,
    psychic,
    guesser,
    leftStatement,
    rightStatement,
    state,
    psychicSubject,
    psychicScore,
    guessedScore,
  } = req.body;

  let game = games.find((g) => g.gameId === parseInt(gameId));

  Object.assign(game, {
    psychic,
    guesser,
    leftStatement,
    rightStatement,
    state,
    psychicSubject,
    psychicScore,
    guessedScore,
  });

  res.status(200).end();
});

app.post("/getgame", (req, res, next) => {
  console.table(games);
  const { gameId } = req.body;

  const game = games.find((g) => g.gameId === parseInt(gameId));
  res.json(game);
});

const port = process.env.PORT || 8881;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
