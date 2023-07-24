const mysql = require('mysql2');

var conn = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"root123",
    database:"genomiki"
});


conn.connect(function(err){
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
    console.log("Connected!")
});



module.exports = conn;
