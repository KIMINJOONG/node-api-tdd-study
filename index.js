const express = require("express");
const app = express();
const morgan = require("morgan");

let users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" }
];

app.use(morgan("dev"));

app.get("/users", (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.filter(user => user.id === id)[0];
  return res.json(user);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

module.exports = app;
