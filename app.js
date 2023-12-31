var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var userauthRouter = require('./routes/userauth');
var authRouter = require('./routes/auth');
var reloadRouter = require('./routes/reload');
var logoutRouter = require('./routes/logout');
var {checkLogin} = require('./controller/index');
const Sequelize = require('./models/index');
const table_listRouter = require('./routes/table_list')
const delete_fileRouter = require('./routes/delete_file')

// database connection
Sequelize.authenticate().then(() => {
  console.log("stablish successfully");
  Sequelize.sync();
}).catch(err => {
  console.log("db is not connect");
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));

app.use(flash());


app.use('/', indexRouter);
app.use('/users', checkLogin, usersRouter);
app.use('/home', checkLogin, homeRouter);
app.use('/userauth', userauthRouter);
app.use('/auth', authRouter);
app.use('/reload', checkLogin, reloadRouter);
app.use('/logout', checkLogin, logoutRouter);
app.use('/table_list',  table_listRouter);
app.use('/delete_file',  delete_fileRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
