var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    routes = require('./routes/routes'),
    expressSession = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    fs = require('fs'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose');

var Account = require('./models/account');
fs.readdirSync(__dirname + '/models').forEach(function(filename){
    if(~filename.indexOf('.js')){
        require(__dirname + '/models/' + filename);
    }
});//TODO create dynamic requiring of models


app.set('views', __dirname + '/views');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var user = require('./roles');

app.use(user.middleware());

app.use('/', routes);

passport.use(new LocalStrategy(
    function(username, password, done) {
        Account.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            /*if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }*/
            debugger
            return done(null, user);
        });
    }
));




//passport.use(new LocalStrategy(Account.authenticate()));

//passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.connect('mongodb://den:den@ds035290.mongolab.com:35290/bugsdemodb');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.use(function(req,res){
    res.render('pages/404');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

