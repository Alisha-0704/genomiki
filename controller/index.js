var jwt = require('jsonwebtoken');
var jwt_sec_key = 'jgdfsafdjasl;kfdj;slatjewljsld;fj;slafjdklsajsdaf';


function checkLogin(req, res, next) {


    // check headers

    let authHeader = req.cookies.jwt;
    // console.log('jwt.....',authHeader);

    // varify the token
    jwt.verify(authHeader, jwt_sec_key, function (err, decoded) {
        if (err){
            req.flash('message', 'Session is expired , please login again');
            res.status(401).redirect('/');
        } else{
            // console.log("decoded data ", decoded)
            req.body.userData = decoded;
            
            next();
        }

    });
}

module.exports.checkLogin = checkLogin;