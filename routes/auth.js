var express = require("express");
var router = express.Router();
var db = require('../database')

/*  users listing. */
router.post("/", async function (req, res) {
  let username = req.body.username;
  let user_pass = req.body.userpass;

  console.log(username, user_pass);

  // check user exist for this email into the database
  if (username && user_pass) {
    // Execute SQL query that'll select the account from the database based on the specified username and password

    db.query('SELECT * FROM loginusers WHERE user_name = ? AND user_pass = ?', [username, user_pass], function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) {
        throw error;
      } else {
        if (results.length > 0) {
          // request.session.userinfo = results.user_id;
          res.redirect('/home');
          console.log(results);
          console.log(results.length)
          console.log(results.length > 0)
        } else {
          res.send('username or password in valid')
        }

      }
    });

  } else {
    res.send('Please enter Username and Password I am outside!');
    res.end();
  }

});

module.exports = router;
