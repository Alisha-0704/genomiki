const express = require('express');
const router = express.Router();

// API route to destroy the old session and generate a new one
router.get('/', (req, res) => {
  // Generate a new session ID
  const oldSessionID = req.session.id;
  req.session.regenerate((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error regenerating session');
    } else {
      // Set a new value in the new session
      req.session.username = 'newUser';
      // Delete the old session
      req.sessionStore.destroy(oldSessionID, (err) => {
        if (err) {
          console.log(err);
        }
        res.clearCookie('jwt');
        res.clearCookie('username');
    
        req.flash('message', 'You have logged out. Please login again.');
        res.redirect('/');
      });
    }
  });
  
});

module.exports = router;
