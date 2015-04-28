var ConnectRoles = require('connect-roles');

var user = new ConnectRoles({
    failureHandler: function (req, res, action) {
        var accept = req.headers.accept || '';
        res.status(403);
        if (~accept.indexOf('html')) {
            res.render('pages/access-denied', {action: action});
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});

user.use('auth', function (req) {
    if(req.isAuthenticated()) {
        return true;
    }
});

user.use('admin', function (req) {
    if(req.user && req.user.role === 'administrator') {
        return true;
    }
});

module.exports = user;