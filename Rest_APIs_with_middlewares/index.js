const express = require("express");

const app = express();

app.use(logger)

app.get("/books", (req, res) => {
    res.send("Fetching all books")
  });

// admin, user, student, teacher, IA, SDE1
app.get("/book", logger1("GameOfThrones"), (req, res) => {
  res.send({bookName: req.name});
});

function logger(req, res, next) {
  console.log("Fetching all books");
  next();
}

function logger1(name) {
  return function (req, res, next) {
    if (name == "GameOfThrones" || name == "HarryPotter") {
      req.name = name;
    }
    next();
  };
}

app.listen(4335, function () {
  console.log("listening on port 4335");
});