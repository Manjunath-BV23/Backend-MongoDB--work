const express = require("express");

const books = require("./data.json")

//console.log("Express", express);

const app = express();

app.get("", (req, res) => {
    return res.send("Hello")
});

app.get("/books", (req, res) => {
    return res.send(books)
})


app.listen(5399, function (){
    console.log("Hello")
})