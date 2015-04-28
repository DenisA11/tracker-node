var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    name: String,
    password:String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('tracker-users', Account);

