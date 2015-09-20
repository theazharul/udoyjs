var _ = require('underscore');
var config = require('./config/config');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');
var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session');

// configuration ===============================================================
mongoose.connect(config.database.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/app/views/' + config.theme));
app.set('view engine', 'hbs');
//app.enable ('view cache');

//Template Partials
hbs.registerPartials(path.join(__dirname, '/app/views/' + config.theme + '/partials'));

app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use("/uploads",express.static(path.join(__dirname, '/uploads')));
// required for passport
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}
               )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(function(req, res, next){
    if(req.user){
    res.locals.user = req.user;
    }

    next();

  });

require('./app/routes')(app, config);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
