//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  username: {
    type: String,
    unique: true
  }
});

// Compile model from schema
var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
