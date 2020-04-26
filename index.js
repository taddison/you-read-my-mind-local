const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(bodyparser.json());
app.use(morgan("dev"));

let games = [{ gameId: 89, sessions: [] }];

app.post("/createsession", (req, res, next) => {
  const { name, gameId, sessionId } = req.body;

  const game = games.find((g) => g.gameId === parseInt(gameId));
  game.sessions.push({ sessionId, name });

  res.status(201).end();
});

app.post("/deletesession", (req, res, next) => {
  let { sessionId, gameId } = req.body;

  const game = games.find((g) => g.gameId === parseInt(gameId));
  console.log(game);
  game.sessions = game.sessions.filter((s) => s.sessionId !== sessionId);

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
  console.table(game.sessions);

  res.json(game);
});

const port = process.env.PORT || 8881;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
