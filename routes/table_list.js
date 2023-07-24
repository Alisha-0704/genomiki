const express = require('express');
const router = express.Router();
const Model =require('../models/upload_fl');


router.get('/', async function(req, res){

  var userEmail = req.cookies.username;
    try {
        const file = await Model.findAll({ where: { email: userEmail } });
        res.render('table_list', {files : file, userEmail : userEmail})
        console.log('database data');
        // console.log('Users:', file.map(user => file.toJSON()));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
   
});

module.exports = router;