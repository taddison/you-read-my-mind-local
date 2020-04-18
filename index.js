const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");

const app = express();
let sessions = [];
const games = [];

app.use(bodyparser.json());
app.use(morgan("dev"));

app.post("/createsession", (req, res, next) => {
  const name = req.body.name;
  const sessionId = req.body.sessionId;

  sessions.push({ name, sessionId });

  res.status(201).end();
});

app.get("/getsessions", (req, res, next) => {
  res.json(sessions);
});

app.post("/deletesession", (req, res, next) => {
  const {sessionId} = req.body;
  sessions = sessions.filter(s => {s.id !== sessionId})
  res.status(204).end()
});
//  setGame = (id,
//   {
//     psychic,
//     guesser,
//     leftStatement,
//     rightStatement,
//     state,
//     psychicSubject,
//     psychicScore,
//     guessedScore,
//   })
// getGame = (id)

const port = process.env.PORT || 8881;
const server = app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
