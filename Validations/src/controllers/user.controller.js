const { body, validationResult } = require("express-validator");

const express = require("express");

const User = require("../models/user.model");
const req = require("express/lib/request");

const router = express.Router();

router.post(
  "",
  body("first_name")
    .isString()
    .isLowercase()
    .isLength({ min: 3, max: 20 })
    .withMessage("First name should be 3 to 20 characters long"),
  body("last_name").isLowercase().isLength({ min: 3, max: 20 }),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("pincode").isNumeric().isLength(6), 
  body("password")
    .isLength({ min: 8, max: 20 })
    .custom((value) => {
      let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (pattern.test(value)) {
        return true;
      }
      throw new Error("Password is not strong");
    }),
  body("ip_address").notEmpty().isIP(),
  body("age").isNumeric().isLength({ min:1, max:100}),
  body("gender").custom((value) => {
    //const user = await User.findOne({ email: value });
    if (value != "Male" && value != "Female" && value != "Others") {
      throw new Error("Please enter your correct gender");
    }
    return true;
  })
);

// /users
router.get("", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 15;


    const query = { gender: "Female" };
    const users = await User.find(query) // 30 documents
      .skip((page - 1) * size) // page 1 first 15 documents
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await User.find(query).countDocuments()) / size
    );

    return res.send({ users, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:gender", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 15;


    const query = { gender: req.params.gender };
    const users = await User.find(query) // 30 documents
      .skip((page - 1) * size) // page 1 first 15 documents
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await User.find(query).countDocuments()) / size
    );

    return res.send({ users, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
