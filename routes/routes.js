var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    user = require('../roles'),
    Account = require('../models/account');



router.get('/', function (req, res) {
    res.render('pages/index', { user : req.user  });
});

router.get('/register', function(req, res) {
    res.render('pages/register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('pages/register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('pages/login', { user : req.user });
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
    res.redirect('/');
});

router.get('/logout', user.can('auth'), function(req, res) {
    req.logout();
    res.redirect('/');
});
router.get('/about', user.can('auth'), function (req, res, next) {
    res.render('pages/about');
});

router.get('/users', function (req, res, next) {
    mongoose.model('tracker-users').find(function (err, users) {
        if (err) throw new Error(err);
        res.render('pages/users', { users:users});
    })
});
router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
