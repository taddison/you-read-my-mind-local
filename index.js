const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(bodyparser.json());
app.use(morgan("dev"));

let sessions = [];
let games = [{ gameId: "89" }];

app.post("/createsession", (req, res, next) => {
  const { name, sessionId } = req.body;

  sessions.push({ name, sessionId });

  res.status(201).end();
});

app.get("/getsessions", (req, res, next) => {
  res.json(sessions);
});

app.post("/deletesession", (req, res, next) => {
  const { sessionId } = req.body;
  sessions = sessions.filter((s) => {
    s.id !== sessionId;
  });
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

  let game = games.find((g) => g.gameId === gameId);

  Object.assign(game, {
    gameId,
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

app.get("/getgame", (req, res, next) => {
  const { gameId } = req.body;

  const game = games.find((g) => g.gameId === gameId);
  res.json(game);
});

const port = process.env.PORT || 8881;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
