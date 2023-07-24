var express = require("express");
var router = express.Router();

var loginuser = require("../models/loginuser");

var Session = require('../models/jwt');

let bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require("jsonwebtoken");
var jwt_sec_key = "jgdfsafdjasl;kfdj;slatjewljsld;fj;slafjdklsajsdaf";

/*  users listing. */
router.post("/", async function (req, res) {
  let username = req.body.username;
  let user_pass = req.body.userpass;

  console.log(username, user_pass);

  // check user exist for this email into the database
  let isAvailable = await loginuser.findOne({
    where: {
      user_name: username,
    },
  });

  if (!isAvailable) {
    return res.status(400).send({ message: "User not exist" });
  }

  // check password
  let passMatch = await loginuser.findOne({
    where: {
      user_name: username,
      user_pass: user_pass,
    },
  });

  if (!passMatch)
    return res.status(400).send({ message: "Password is incorrect" });

  // generate token
  let token =   jwt.sign({ ...isAvailable }, jwt_sec_key, {
    expiresIn: "5h",
  });
  Session.create({
    user_id: isAvailable.user_id,
    jwt: token,
    status: "Valid",
    username: username
  });
console.log(username)

  res.cookie("jwt",  token,  { httpOnly: true, maxAge: 10000 * 1000 });
  res.cookie('username', username);
  console.log("hitted");

  res.redirect('/home')
});

module.exports = router;
