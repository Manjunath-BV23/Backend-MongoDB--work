const express = require("express")

const Student = require("../models/student.model")

const router = express.Router();


router.post("", async (req, res) => {
      try {
        const user = await Student.create(req.body);
    
        return res.status(201).send(user);
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });
    
    router.get("", async (req, res) => {
      // thennable => proper then
      try {
        const users = await Student.find().lean().exec(); // db.users.find() // proper promise
    
        return res.send(users);
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });
    
    // met + route => get /users/${variable} and the name of variable is id
    router.get("/:id", async (req, res) => {
      try {
        const user = await Student.findById(req.params.id).lean().exec();
    
        if (user) {
          return res.send(user);
        } else {
          return res.status(404).send({ message: "User not found" });
        }
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });
    
    // met + routeusers/${variable} and the name of  => patch /variable is id
    router.patch("/:id", async (req, res) => {
      try {
        const user = await Student.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
          .lean()
          .exec();
    
        res.status(201).send(user);
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });
    
    // met + route => delete /users/${variable} and the name of variable is id
    router.delete("/:id", async (req, res) => {
      try {
        const user = await Student.findByIdAndDelete(req.params.id).lean().exec();
    
        res.send(user);
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });

    module.exports = router