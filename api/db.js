var cradle = require('cradle');
var secret = require('../../secret');

var db = new(cradle.Connection)('http://127.0.0.1', 5984, {
  auth: {username: secret.dbUserName, password: secret.dbPassword}
}).database('products');

module.exports = db;
