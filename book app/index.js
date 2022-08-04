const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 1

const connect = () => {
    return mongoose.connect("mongodb+srv://manjunath:manjus_53@cluster0.ubjac.mongodb.net/bookDatabase?")
}

//2 
const authorSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    }
)

const Author = mongoose.model("author", authorSchema)

const bookSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        author: [
            {type: mongoose.Schema.Types.ObjectId, ref: "author", required: true}
        ],
        year_written: {type: Number, required: true},
        section: {type: String, required: true},
        price: {type: Number, required: true}
    }
)

//3

const Book = mongoose.model("book", bookSchema);

// section model
const sectionSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        books:[
            {type: mongoose.Schema.Types.ObjectId, ref: "book", required: true}
        ]
    }
)

const Section = mongoose.model("section", sectionSchema)

// books model


//author model

//---------------------------------------------------book CRUD------------------------------------------------------------------------
app.post("/books", async (req, res) => {
    try {
      const book = await Book.create(req.body);
  
      return res.status(201).send(book);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  app.get("/books", async (req, res) => {
    // thennable => proper then
    try {
      const books = await Book.find().lean().exec(); // db.users.find() // proper promise
  
      return res.send(books);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => get /users/${variable} and the name of variable is id
  app.get("/books/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).lean().exec();
  
      if (book) {
        return res.send(book);
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + routeusers/${variable} and the name of  => patch /variable is id
  app.patch("/books/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      res.status(201).send(book);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => delete /users/${variable} and the name of variable is id
  app.delete("/books/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
  
      res.send(book);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

//   ----------------------------------section CRUD-------------------------------

app.post("/section", async (req, res) => {
    try {
      const section = await Section.create(req.body);
  
      return res.status(201).send(section);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  app.get("/section", async (req, res) => {
    // thennable => proper then
    try {
      const books = await Section.find().lean().exec(); // db.users.find() // proper promise
  
      return res.send(books);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => get /users/${variable} and the name of variable is id
  app.get("/books/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).lean().exec();
  
      if (book) {
        return res.send(book);
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + routeusers/${variable} and the name of  => patch /variable is id
  app.patch("/books/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      res.status(201).send(book);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  // met + route => delete /users/${variable} and the name of variable is id
  app.delete("/books/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
  
      res.send(book);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });






app.listen(2311, async function(){
    try{
        await connect();
        console.log("listening Manju")
    }catch (e){
        console.log(e.message)
    }
})


