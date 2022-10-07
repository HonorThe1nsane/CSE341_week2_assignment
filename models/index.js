const dbConfig = require('../db/connect.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
//db.url = dbConfig.url;
db.person = require('./contacts.js')(mongoose);

module.exports = db;