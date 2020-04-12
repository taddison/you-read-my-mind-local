const express = require("express");

const sessions = [];
const games = [];

// deleteSession = (id)
// createSession = (sessionId, name)
// getSession = ()
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

const app = express();
const port = process.env.PORT || 8881;
const server = app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
