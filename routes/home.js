var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("username",req.cookies.username);
  res.render('home', {message: req.flash('message'), arr:req.session.arr || [] });
});

module.exports = router;
