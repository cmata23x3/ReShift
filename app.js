var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var workplaces = require('./routes/workplaces');
var managers = require('./routes/managers');
var employees = require('./routes/employees');
var shifts = require('./routes/shifts');

var app = express();

var dbURL = 'mongodb://localhost/ReShift';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    dbURL = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/reshift';
}
var mongoose = require('mongoose').connect(dbURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
if (app.get('env') === 'development') {
    console.log("using if");
    app.use(session({ 
        resave: true,
        saveUninitialized: true,
        secret: '$ecRe7',
        store: new MongoStore({
            db : "ReShift"
        }) 
    }));
}
else{
    console.log("using else");
    app.use(session({ 
        resave: true,
        saveUninitialized: true,
        secret: '$ecRe7',
        store: new MongoStore({
            db: "reshift",
            username: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
            password: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
            host: process.env.OPENSHIFT_MONGODB_DB_HOST,
            port: process.env.OPENSHIFT_MONGODB_DB_PORT
        }) 
    }));
}

app.use('/', routes);
app.use('/users', users);
app.use('/employees', employees);
app.use('/workplaces', workplaces);
app.use('/managers', managers);
app.use('/shifts', shifts);

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

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

console.log('Its running on: ', (process.env.OPENSHIFT_NODEJS_PORT || 8080));
app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
    process.env.OPENSHIFT_NODEJS_IP);

module.exports = app;