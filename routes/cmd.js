const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.get('/', (req, res) => {
  // Run the test.sh script using child_process.exec()
  exec('bash C:/Users/alish/Downloads/genomiki/public/test.sh', { shell: 'C:/Program Files/Git/bin/bash.exe' }, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing test.sh:', error);
      res.status(500).send('Error executing test.sh');
    } else {
      // Send the stdout as the response
      res.send(`<pre>${stdout}</pre>`);
    }
  });
});

module.exports = router;
